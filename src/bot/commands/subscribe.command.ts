import * as TelegramBot from 'node-telegram-bot-api';
import { UserService } from 'src/User/user.service';
import getWeatherData from '../helper/getWeatherData';

const userStates = new Map();

export const subscribeCommand = (
  bot: TelegramBot,
  userService: UserService,
) => {
  bot.on('message', async (msg) => {
    // console.log(msg);
    const chatId = msg.chat.id;
    const username = msg.from.first_name;
    if (userStates.get(chatId) === 'waitingForCity') {
      //not existing user and bot has sent enter city message
      const city = msg.text;
      const weatherData = await getWeatherData(city);
      if (weatherData === 'Invalid city name') {
        bot.sendMessage(
          chatId,
          'Invalid city name. Please enter a valid city name:',
        );
      } else {
        const { weatherMessage, conditionImg } = weatherData;
        const newUser = await userService.create({
          userId: chatId,
          username,
          city,
          isSubscribed: true,
        });
        bot.sendMessage(
          chatId,
          'You have successfully subscribed to daily weather updates! Here is your current weather data:',
        );
        bot.sendPhoto(chatId, conditionImg, { caption: weatherMessage });
        userStates.delete(chatId);
      }
    }
  });

  bot.onText(/\/subscribe/, async (msg) => {
    const chatId = msg.chat.id;
    const existingUser = await userService.findOne(chatId);
    if (existingUser) {
      bot.sendMessage(chatId, 'You are already subscribed');
    } else if (!existingUser && !userStates.get(chatId)) {
      //not existing user and bot hasnt sent enter city message
      userStates.set(chatId, 'waitingForCity');
      bot.sendMessage(chatId, 'Please enter your city');
    }
  });
};

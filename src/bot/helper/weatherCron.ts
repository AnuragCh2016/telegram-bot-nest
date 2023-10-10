import * as TelegramBot from 'node-telegram-bot-api';
import * as cron from 'node-cron';
import { UserService } from 'src/User/user.service';
import getWeatherData from './getWeatherData';

export const setupWeatherCron = (
  bot: TelegramBot,
  userService: UserService,
) => {
  cron.schedule(
    '0 8 * * *',
    async () => {
      const subscribers = await userService.findAll();
      for (const subscriber of subscribers) {
        const { userId, city } = subscriber;
        const weatherData = await getWeatherData(city);
        if (weatherData !== 'Invalid city name') {
          const { weatherMessage, conditionImg } = weatherData;
          //by the time they are subscribed, city name is validated
          bot.sendMessage(
            userId,
            `Good morning! The weather update for ${city}:\n${weatherMessage}`,
          );
          bot.sendPhoto(userId, conditionImg, { caption: 'Weather condition' });
        }
      }
    },
    {
      scheduled: true,
      timezone: 'Asia/Kolkata',
    },
  );
};

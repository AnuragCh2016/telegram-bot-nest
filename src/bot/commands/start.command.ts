import * as TelegramBot from 'node-telegram-bot-api';

export const startCommand = (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      'Welcome to the weather bot! Write /help to see the list of commands',
    );
  });
};

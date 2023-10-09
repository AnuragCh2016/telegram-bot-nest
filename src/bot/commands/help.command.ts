import * as TelegramBot from 'node-telegram-bot-api';

const commands = [
  { command: '/start', description: 'Start using the bot' },
  { command: '/subscribe', description: 'Subscribe to daily weather updates' },
  // Add more commands and descriptions
];

// Command handler for /help
export const helpCommand = (bot: TelegramBot) => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    // Generate a formatted list of commands and descriptions
    const helpMessage = commands
      .map((cmd) => `${cmd.command}: ${cmd.description}`)
      .join('\n');

    // Send the list as a message
    bot.sendMessage(chatId, `Available commands:\n${helpMessage}`);
  });
};

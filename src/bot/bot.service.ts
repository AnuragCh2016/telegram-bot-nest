import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { helpCommand, startCommand, subscribeCommand } from './commands';
import { UserService } from '../User/user.service';
import { setupWeatherCron } from './helper/weatherCron';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(private readonly userService: UserService) {}

  onModuleInit() {
    // console.log('BotService');
    //in the onModuleInit function, initialize the bot with token
    //create a function called listen that listens to particular commands
    const token = process.env.BOT_TOKEN;
    this.bot = new TelegramBot(token, { polling: true });

    this.listen();
    this.dailyUpdates();
  }

  private listen() {
    startCommand(this.bot);
    helpCommand(this.bot);
    subscribeCommand(this.bot, this.userService);
  }

  private dailyUpdates() {
    setupWeatherCron(this.bot, this.userService);
  }
}

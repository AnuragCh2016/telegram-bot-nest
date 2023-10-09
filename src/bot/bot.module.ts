import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { UserSchema } from '../User/user.model';
import { UserService } from 'src/User/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [BotController],
  providers: [BotService, UserService],
})
export class BotModule {}

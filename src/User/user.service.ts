// user.service.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema, User } from './user.model'; // Adjust the path to your UserSchema

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOne(userId: number): Promise<User | null> {
    return await this.userModel.findOne({ userId });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({
      isBanned: false,
      isSubscribed: true,
    });
  }

  // Add other methods as needed, e.g., to find users by username, update users, etc.
}

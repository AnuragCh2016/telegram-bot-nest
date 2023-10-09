import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  city: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

export interface User {
  userId: number;
  username: string;
  role: string;
  city: string;
  createdAt: Date;
  isSubscribed: boolean;
  isBanned: boolean;
}

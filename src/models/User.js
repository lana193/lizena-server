import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_image: {
    type: String
  },
  role: {
    type: String,
    enum : ['User', 'Admin'],
    default: 'User'
  }
});

export const User = model('User', UserSchema);
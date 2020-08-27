import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  user_name: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  call_me: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true
  },
  messageId: {
    type: String,
  },
  response: {
    type: String,
  },
  created: {
    type: String
  }
});

export const Message = model('Message', MessageSchema);
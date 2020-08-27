import nodemailer from 'nodemailer';

import creds from '../../config/creds';
import { Message } from '../models/Message';

const transport = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    date: new Date(),
    auth: {
      user: creds.USER,
      pass: creds.PASSWORD
    }
  }

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } 
  else {
    console.log('Server is ready to take messages');
  }
});

export const sendMessageService = (body) => {
  let success;
  let message = body;
  let call_me;
  if(body.call_me) {
      call_me = 'Так';
  }
  else {
      call_me = 'Ні';
  } 

  const { user_name, user_email, phone_number, text } = message;

  const content = `Ім'я: ${user_name} \n 
      email: ${user_email} \n 
      телефон: ${phone_number} \n 
      Перетелефонуйте мені: ${call_me} \n 
      Текст повідомлення: ${text}`

  const mailOptions = {
      from: 'lana19333@gmail.com',
      to: 'lizenabud@gmail.com',
      subject: 'Повідомлення з сайту lizenabud.com.ua',
      text: content
  }

   transporter.sendMail(mailOptions, (error, info) => {
        if(error) { 
           success = false;
        } 
        else {
            message.messageId = info.messageId;
            message.response = info.response;
            message.created = new Date().toString();
            const newMessage = new Message(message);
            success = newMessage.save(newMessage);
        }
    })  
    return success; 
}

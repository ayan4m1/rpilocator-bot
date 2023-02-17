import { createTransport } from 'nodemailer';

import { smtp as config } from './config.js';

const transport = createTransport({
  host: config.hostname,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.username,
    pass: config.password
  }
});

export const sendNotification = (title) =>
  transport.sendMail({
    from: 'No-Reply <noreply@bulletlogic.com>',
    to: 'ayan4m1@gmail.com',
    subject: 'Pi Located!',
    text: title
  });

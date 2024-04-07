import { createTransport } from 'nodemailer';

import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

function makePassword(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const resetPassword = async ({ email }) => {
  const newPassword = makePassword(8);

  var transporter = createTransport({
    host: 'smtp.hosts.co.uk',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'tallyman.uk',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: 'no-reply@tallyman.uk',
    to: email,
    subject: 'Your password has been updated',
    text: `Use this to sign in next time: ${newPassword}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error('Email could not be sent');
  }

  const existingEmail = await AppDataSource.manager.findOne(User, {
    where: { email: email.toLowerCase() },
  });

  if (!existingEmail) {
    console.log('createUser - warning - Email validation failed. User could not be found.');
    throw new Error('No account with that email could be found.');
  }

  await AppDataSource.manager.update(User, { email }, { password: newPassword });

  return email;
};

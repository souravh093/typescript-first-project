import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (resetUILink: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'souravofficial.web@gmail.com',
      pass: 'wyfa lfdx umow ggze',
    },
  });

  // send mail
  await transporter.sendMail({
    from: 'souravofficial.web@gmail.com',
    to: `${email}`,
    subject: 'Reset you password within 10 mins',
    text: '',
    html: resetUILink,
  });
};

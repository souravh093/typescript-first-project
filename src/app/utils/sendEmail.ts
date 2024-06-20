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

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'souravofficial.web@gmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: 'Click below like to reset password', // Subject line
    text: 'Reset you password within 10 mins', // plain text body
    html: `<a href=${resetUILink}>${resetUILink}</a>`, // html body
  });
};

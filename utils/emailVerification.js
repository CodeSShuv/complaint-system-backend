import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const senderEmail = async (email, subject, emailTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASS_KEY
      }
    });

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: subject,
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default senderEmail;
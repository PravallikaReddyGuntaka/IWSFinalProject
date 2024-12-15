const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Set up the transporter for Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_SECRET,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
  
const sendResetPasswordEmail = async (email, resetCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset Code',
    html: `<p>Your reset code is: <strong>${resetCode}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset code sent to:', email);
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw new Error('Failed to send reset email');
  }
};

module.exports = { sendResetPasswordEmail };

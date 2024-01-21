import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 578,
      secure: true,
      auth: {
        user: 'your email',
        pass: 'your password',
      },
    });

    await transporter.sendMail({
      from: 'your email',
      to: email,
      subject: subject,
      text: text,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email not sent!');
    console.error(error);
    return error;
  }
};

export default sendMail;

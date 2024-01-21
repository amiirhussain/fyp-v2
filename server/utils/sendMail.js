import nodemailer from 'nodemailer';

const sendMail = async (email, activationURL) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 578,
      secure: true,
      auth: {
        user: 'spaceseekersfyp@gmail.com',
      },
    });

    await transporter.sendMail({
      from: 'spaceseekersfyp@gmail.com',
      to: email,
      subject: 'Verify Your Email Address for Space Seekers Account',
      html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #3498db; text-align: center;">Space Seekers</h2>
      <p style="text-align: center;">Welcome to Space Seekers! To get started, please verify your email address:</p>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="${activationURL}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
      </div>
      
      <p style="text-align: center; margin-top: 20px;">If the button above does not work, you can also copy and paste the following URL into your browser:</p>
      <p style="text-align: center; margin-bottom: 20px; font-size: 0.9em;">${activationURL}</p>
      
      <p style="text-align: center;">Please note that this link will expire in [time duration], so complete the verification process promptly.</p>
      
      <p style="text-align: center; margin-top: 20px;">If you did not sign up for Space Seekers, please disregard this email.</p>
      
      <p style="text-align: center; margin-top: 20px;">Thank you for choosing Space Seekers. If you have any questions or need assistance, feel free to contact our support team at [support email].</p>
      
      <p style="text-align: center; margin-top: 20px;">Best regards,<br/>[Amir Hussain]<br/>Space Seekers Team</p>
    </div>`,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email not sent!');
    console.error(error);
    return error;
  }
};

export default sendMail;

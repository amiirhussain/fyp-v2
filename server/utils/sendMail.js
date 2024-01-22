import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 578,
  secure: true,
  auth: {
    user: 'spaceseekersfyp@gmail.com',
    pass: 'cagutastgckmceue', // Replace with your actual email password or use an app-specific password
  },
});

const sendVerificationEmail = async (email, activationURL) => {
  try {
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

          <p style="text-align: center;">Please note that this link will expire in 1 hour, so complete the verification process promptly.</p>

          <p style="text-align: center; margin-top: 20px;">If you did not sign up for Space Seekers, please disregard this email.</p>

          <p style="text-align: center; margin-top: 20px;">Thank you for choosing Space Seekers. If you have any questions or need assistance, feel free to contact our support team at [support email].</p>

          <p style="text-align: center; margin-top: 20px;">Best regards,<br/>[Amir Hussain]<br/>Space Seekers Team</p>
        </div>
      `,
    });

    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Verification email not sent!');
    console.error(error);
    throw error;
  }
};

const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    await transporter.sendMail({
      from: 'spaceseekersfyp@gmail.com',
      to: email,
      subject: 'Reset Your Password for Space Seekers Account',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #3498db; text-align: center;">Space Seekers</h2>
          <p style="text-align: center;">You've requested to reset your password. To proceed, click the button below:</p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>

          <p style="text-align: center; margin-top: 20px;">If the button above does not work, you can also copy and paste the following URL into your browser:</p>
          <p style="text-align: center; margin-bottom: 20px; font-size: 0.9em;">${resetURL}</p>

          <p style="text-align: center;">Please note that this link will expire in 1 hour, so complete the password reset promptly.</p>

          <p style="text-align: center; margin-top: 20px;">If you did not request a password reset for Space Seekers, please disregard this email.</p>

          <p style="text-align: center; margin-top: 20px;">If you have any questions or need assistance, feel free to contact our support team at [support email].</p>

          <p style="text-align: center; margin-top: 20px;">Best regards,<br/>[Amir Hussain]<br/>Space Seekers Team</p>
        </div>
      `,
    });

    console.log('Reset password email sent successfully');
  } catch (error) {
    console.error('Reset password email not sent!');
    console.error(error);
    throw error;
  }
};

export { sendVerificationEmail, sendResetPasswordEmail };

import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';
import Token from '../models/token.js';
// import sendMail from '../utils/sendMail.js';
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from '../utils/sendMail.js';
import crypto from 'crypto';

const JWT_SECRET = 'secret123';

// User Registration
export const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Duplicate email' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user = await User.create({
      userName: req.body.userName,
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();

    const url = `http://localhost:5173/user/${user.id}/verify/${token.token}`;
    await sendVerificationEmail(user.email, url);

    res.json({
      status: 'ok',
      message: 'An Email sent to your account please verify',
    });
  } catch (err) {
    next(err);
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, 'User not Found!'));

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.fullName,
          email: user.email,
        },
        JWT_SECRET,
      );

      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          }).save();
          const url = `http://localhost:5173/user/${user.id}/verify/${token.token}`;
          await sendVerificationEmail(user.email, url);
        }

        return res
          .status(400)
          .send({ message: 'An Email sent to your account please verify' });
      }

      return res.json({
        status: 'ok',
        user: token,
        message: 'Login Sucessfully',
      });
    } else {
      return res
        .status(400)
        .json({ status: 'error', error: 'Invalid password' });
    }
  } catch (err) {
    next(err);
  }
};

// Sign with Google
export const GoogleAuth = async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(
        crypto.randomBytes(16).toString('hex'),
        10,
      );

      user = await User.create({
        userName:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        fullName: name,
        email,
        password: hashedPassword,
        profileImage: googlePhotoUrl,
        verified: true,
      });

      const token = jwt.sign(
        {
          name: user.fullName,
          email: user.email,
        },
        JWT_SECRET,
      );

      res.json({
        status: 'ok',
        user: token,
        message: 'User registered successfully.',
      });
    } else {
      const token = jwt.sign(
        {
          name: user.fullName,
          email: user.email,
        },
        JWT_SECRET,
      );

      console.log('User logged in successfully:', user);

      return res.json({
        status: 'ok',
        user: token,
        message: 'Login successfully.',
      });
    }
  } catch (err) {
    console.error('Error in GoogleAuth:', err);
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' });
  }
};

// verify user with email
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).send({ message: 'Invalid link' });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).send({ message: 'Invalid link' });
    }

    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error in verifyUser:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    const existingToken = await Token.findOne({ userId: user._id });

    if (existingToken) {
      await Token.deleteOne({ userId: user._id });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    await Token.create({
      userId: user._id,
      token: resetToken,
    });

    const resetUrl = `http://localhost:5173/auth/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    res.json({
      status: 'ok',
      message: 'Reset password email sent successfully',
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;

    const tokenDocument = await Token.findOne({ token: resetToken });

    if (!tokenDocument) {
      console.error('Invalid token:', resetToken);
      return res
        .status(404)
        .json({ status: 'error', error: 'Reset token not found or invalid' });
    }

    const user = await User.findById(tokenDocument.userId);

    if (!user) {
      console.error('User not found for token:', resetToken);
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await Token.deleteOne({ userId: user._id });

    console.log('Password reset successfully');
    res.json({ status: 'ok', message: 'Password reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    next(err);
  }
};

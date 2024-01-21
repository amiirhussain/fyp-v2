import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';
import Token from '../models/token.js';
import sendMail from '../utils/sendMail.js';
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
    await sendMail(user.email, 'Verify Email', url);

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
          await sendMail(user.email, 'Verify Email', url);
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

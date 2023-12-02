import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';

const JWT_SECRET = 'secret123';

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Duplicate email' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      userName: req.body.userName,
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ status: 'ok', message: 'User Registered Successfully' });
  } catch (err) {
    next(err);
  }
};

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

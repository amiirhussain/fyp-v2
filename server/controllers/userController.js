import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const updatePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('User Has Been Deleted!');
  } catch (error) {
    next(error);
  }
};

// Get Single User
export const getUser = async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail }).select('-password');
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

// Get All User
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch (error) {
    next(error);
  }
};

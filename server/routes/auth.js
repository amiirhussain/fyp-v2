import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

//Create User
router.post('/register', register);

router.post('/login', login);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPassword);

router.get('/google', (req, res) => {
  res.send('Google Sign In!');
});

router.get('/logout', (req, res) => {
  res.send('Logout!');
});

export default router;

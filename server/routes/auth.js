import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

//Create User
router.post('/register', register);

router.post('/login', login);

router.get('/google', (req, res) => {
  res.send('Google Sign In!');
});

router.get('/logout', (req, res) => {
  res.send('Logout!');
});

export default router;

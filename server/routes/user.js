import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updatePassword,
} from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

//Update
router.put('/:id', updateUser);
//update password
router.put('/reset-password/:id', updatePassword);
//Delete
router.delete('/:id', deleteUser);
//Get
router.get('/single-user', authenticateToken, getUser);
//Get All
router.get('/', getAllUsers);

export default router;

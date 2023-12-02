import express from 'express';
import {
  createApartment,
  deleteApartment,
  getAllApartments,
  getAllApartmentsByUser,
  getApartment,
  updateApartment,
} from '../controllers/apartmentController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const apartmentRoute = express.Router();

//Create
apartmentRoute.post('/', authenticateToken, createApartment);
//Update
apartmentRoute.put('/:id', authenticateToken, updateApartment);
//Delete
apartmentRoute.delete('/:id', authenticateToken, deleteApartment);
//Get apartment by user
apartmentRoute.get('/by-user', authenticateToken, getAllApartmentsByUser);
//Get all apartment list
apartmentRoute.get('/get-all', getAllApartments);
// get by id
apartmentRoute.get('/:id', getApartment);

export default apartmentRoute;

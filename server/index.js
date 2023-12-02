import express, { Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import apartmentRoute from './routes/apartment.js';

// dotenv.config();
const app = express();
const PORT = 1337;

// allow to send json to server
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/space-seekers-fyp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// //Middlewares
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/apartment', apartmentRoute);

// Error Handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error!';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

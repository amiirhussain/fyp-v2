import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/header/Header';
import Home from './pages/home/Home';
import ApartmentDetail from './components/apartmentDetail/ApartmentDetail';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apartment/:id" element={<ApartmentDetail />} />
      </Routes>
    </>
  );
};

export default App;

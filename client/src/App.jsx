import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/header/Header';
import Home from './pages/home/Home';
import ApartmentDetail from './components/apartmentDetail/ApartmentDetail';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartment/:id" element={<ApartmentDetail />} />
      </Routes>
    </>
  );
};

export default App;

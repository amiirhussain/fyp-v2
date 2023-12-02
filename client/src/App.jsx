import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/header/Header';
import Home from './pages/home/Home';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;

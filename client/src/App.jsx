import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Navbar from './components/header/Header';
import Home from './pages/home/Home';
import ApartmentDetail from './components/apartmentDetail/ApartmentDetail';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const setUserLoggedIn = (loggedIn) => {
    setIsUserLoggedIn(loggedIn);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      {isUserLoggedIn ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/apartment/:id" element={<ApartmentDetail />} />
      </Routes>
    </>
  );
};

export default App;

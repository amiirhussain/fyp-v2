import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/home/Home';
import ApartmentDetail from './components/apartmentDetail/ApartmentDetail';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './components/userProfile/UserProfile';
import { UserDataProvider } from './contexts/UserDataContext';
import { ApartmentProvider } from './contexts/ApartContext';
import AddApartment from './components/addApartment/AddApartment';
import PageNotFound from './components/pageNotFound/pageNotFound';
import ComingSoon from './components/comingSoon/ComingSoon';
import { SearchFilterProvider } from './contexts/SearchFilterContext';
import SearchFilter from './components/searchFilter/SearchFilter';
import MatchUser from './components/matchUser/MatchUser';
import EmailVerify from './auth/EmailVerify';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import Setting from './components/setting/Setting';

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const setUserLoggedIn = (loggedIn) => {
    setIsUserLoggedIn(loggedIn);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/dashboard"
          element={<Dashboard setUserLoggedIn={setUserLoggedIn} />}
        >
          <Route
            index
            element={
              <ApartmentProvider>
                <AddApartment />
              </ApartmentProvider>
            }
          />
          <Route
            path="profile"
            element={
              <UserDataProvider>
                <UserProfile />
              </UserDataProvider>
            }
          />
          <Route
            path="analytics"
            element={<ComingSoon pageTitle="Analytics" />}
          />
          <Route path="match-user" element={<MatchUser />} />
          <Route path="chats" element={<ComingSoon pageTitle="Chats" />} />
          <Route
            path="setting"
            element={
              <UserDataProvider>
                {' '}
                <Setting />
              </UserDataProvider>
            }
          />
        </Route>
        <Route
          path="/login"
          element={<Login setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:resetToken"
          element={<ResetPassword />}
        />
        <Route path="/user/:id/verify/:token" element={<EmailVerify />} />

        <Route
          path="/filter"
          element={
            <SearchFilterProvider>
              <SearchFilter />
            </SearchFilterProvider>
          }
        />
        <Route path="/apartment/:id" element={<ApartmentDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;

import React from 'react';
import Hero from '../../components/hero/Hero';
import AllList from '../../components/allList/AllList';
import Navbar from '../../components/header/Header';
import CustomFooter from '../../components/footer/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <Hero />
        <AllList />
      </div>
      <CustomFooter />
    </>
  );
};

export default Home;

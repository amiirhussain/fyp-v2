import React from 'react';
import Hero from '../../components/hero/Hero';
import AllList from '../../components/allList/AllList';
import Navbar from '../../components/header/Header';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <Hero />
        <AllList />
      </div>
    </>
  );
};

export default Home;

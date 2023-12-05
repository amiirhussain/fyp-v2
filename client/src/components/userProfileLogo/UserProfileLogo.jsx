import React from 'react';
import './userPrfoileLogo.css';
import { useUserData } from '../../contexts/UserDataContext';

const UserProfileLogo = () => {
  const { userData, loading } = useUserData();

  console.log(userData);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="logged--user">
          <img src={userData.profileImage} alt="" />
          <h3>{userData.fullName}</h3>
        </div>
      )}
    </>
  );
};

export default UserProfileLogo;

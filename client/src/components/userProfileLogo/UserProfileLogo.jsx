import React from 'react';
import './userProfileLogo.css';
import { useUserData } from '../../contexts/UserDataContext';

const UserProfileLogo = () => {
  const { userData, loading } = useUserData();
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

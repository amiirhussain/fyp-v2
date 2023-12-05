import React, { createContext, useContext, useEffect, useState } from 'react';
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch(`http://localhost:1337/user/single-user`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'x-access-token': isAuthenticated,
          },
        });

        if (res.status === 404) throw new Error('User not found');

        if (res.status === 200) {
          const data = await res.json();
          setUserData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    }

    getUserData();
  }, [isAuthenticated]);

  return (
    <UserDataContext.Provider value={{ userData, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

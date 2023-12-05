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

  const updateUser = async (userId, newData) => {
    try {
      const res = await fetch(`http://localhost:1337/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'x-access-token': isAuthenticated,
        },
        body: JSON.stringify(newData),
      });

      if (res.status === 404) {
        console.error('User not found');
        return null;
      } else if (res.status === 200) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        return updatedUser;
      } else {
        const errorData = await res.json();
        console.error('Error updating user:', errorData.message);
        return null;
      }
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  };

  const resetPassword = async (userId, newPassword) => {
    try {
      const res = await fetch(
        `http://localhost:1337/user/reset-password/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'x-access-token': isAuthenticated,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        },
      );

      if (res.status === 404) {
        console.error('User not found');
        return null;
      } else if (res.status === 200) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        return updatedUser;
      } else {
        const errorData = await res.json();
        console.error('Password reset failed:', errorData.message);
        return null;
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  return (
    <UserDataContext.Provider
      value={{ userData, loading, updateUser, resetPassword }}
    >
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

import React, { useState, useEffect } from 'react';

const useGetUserData = ({ UserEndpoint }) => {
  const isAuthenticated = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch(`http://localhost:1337/${UserEndpoint}`, {
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
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    }

    getUserData();
  }, [isAuthenticated]);

  return { userData, loading };
};

export default useGetUserData;

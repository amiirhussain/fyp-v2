import React, { useEffect, useState } from 'react';

const useFetch = ({ UrlEndpoint }) => {
  const [apartmentData, setApartmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:1337/${UrlEndpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        if (res.status === 200) {
          setApartmentData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error:', error.message);
        throw error;
      }
    }

    fetchData();
  }, [UrlEndpoint]);

  return { apartmentData, loading };
};

export default useFetch;

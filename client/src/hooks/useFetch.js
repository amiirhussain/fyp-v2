import React, { useEffect, useState } from 'react';

const useFetch = ({ UrlEndpoint }) => {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:1337/${UrlEndpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        });

        const data = await res.json();
        if (res.status === 200) {
          setFetchData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error:', error.message);
        throw error;
      }
    }

    fetchData();
  }, [UrlEndpoint]);

  return { fetchData, loading };
};

export default useFetch;

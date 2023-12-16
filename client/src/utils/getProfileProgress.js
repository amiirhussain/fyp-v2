import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const getProfileProgress = () => {
  const [profileProgress, setProfileProgress] = useState(null);
  //   const userId = userData._id;
  const { fetchData: userData } = useFetch({
    UrlEndpoint: `user/single-user`,
  });
  console.log(userData);
  const userId = userData._id;

  useEffect(() => {
    async function getProgress() {
      try {
        const res = await fetch(
          `http://localhost:1337/user/profile-progress/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const data = await res.json();
        if (res.status === 200) {
          setProfileProgress(data.completionPercentage);
        }
      } catch (error) {
        console.log('Error:', error.message);
        throw error;
      }
    }

    getProgress();
  }, [userId]);

  return { profileProgress };
};

export default getProfileProgress;

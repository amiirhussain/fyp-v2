import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const getProfileProgress = () => {
  const [profileProgress, setProfileProgress] = useState(null);
  const { fetchData: userData } = useFetch({
    UrlEndpoint: `user/single-user`,
  });

  useEffect(() => {
    async function getProgress() {
      try {
        // Ensure userData is defined before making the request
        if (userData && userData._id) {
          const res = await fetch(
            `http://localhost:1337/user/profile-progress/${userData._id}`,
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
        }
      } catch (error) {
        console.log('Error:', error.message);
        throw error;
      }
    }

    getProgress();
  }, [userData]);

  return { profileProgress };
};

export default getProfileProgress;

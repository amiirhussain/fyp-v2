import { Button } from 'antd';
import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router';
import { BiLogoGoogle } from 'react-icons/bi';
import { GoogleOutlined } from '@ant-design/icons';

const OAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('http://localhost:1337/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const userToken = data.user;
        localStorage.setItem('token', userToken);
        navigate('/dashboard');
      } else {
        console.log('Error response from server:', data);
      }
    } catch (error) {
      console.log('Error during Google authentication:', error);
    }
  };

  return (
    <Button
      size="large"
      className="form-btn btn-google"
      icon={<GoogleOutlined className="btn-google-icon" />}
      onClick={handleGoogleClick}
    >
      Continue with Google
    </Button>
  );
};

export default OAuth;

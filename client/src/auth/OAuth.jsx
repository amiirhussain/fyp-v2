import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router';
import { GoogleOutlined } from '@ant-design/icons';

const OAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
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
        setLoading(false);
      } else {
        console.log('Error response from server:', data);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error during Google authentication:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="large"
      className="form-btn btn-google"
      icon={<GoogleOutlined className="btn-google-icon" />}
      onClick={handleGoogleClick}
    >
      {loading ? <Spin /> : 'Continue with Google'}
    </Button>
  );
};

export default OAuth;

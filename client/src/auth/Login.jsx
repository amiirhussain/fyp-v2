import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Card, message, Alert, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import Navbar from '../components/header/Header';
import OAuth from './OAuth';

const Login = ({ setUserLoggedIn }) => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setErrMessage('');

      const response = await fetch('http://localhost:1337/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.user) {
        localStorage.setItem('token', data.user);
        navigate('/dashboard');
        setUserLoggedIn(true);
        setLoading(false);
      } else if (data.message) {
        setErrMessage(data.message);
        setLoading(false);
      } else {
        message.error('Please check your email and password.');
        setErrMessage('Email or Password is invalid');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      message.error('Failed to connect!');
      setLoading(false);
    } finally {
      // setPasswordError('');
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="form--container">
        <Card title="Login" bordered={false} style={{ width: 500 }}>
          <Form
            layout="vertical"
            className="form"
            name="login-form"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <p style={{ textAlign: 'left' }}>
              <Link to="/forgot-password">Forgot Your Password?</Link>
            </p>

            {loading && <Spin />}
            {errMessage && (
              <Alert
                message={errMessage}
                type="warning"
                showIcon
                style={{ marginTop: '10px' }}
              />
            )}

            <Form.Item style={{ marginTop: '1rem' }}>
              <Button
                className="form-btn"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Submit
              </Button>
            </Form.Item>
            <OAuth />

            <p className="form-link">
              Don't have an account? <Link to="/register"> Register Now </Link>
            </p>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;

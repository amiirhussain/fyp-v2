import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
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
        console.log(data.user);
        navigate('/dashboard');
      } else {
        message.error('Please check your email and password.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      message.error('Failed to connect!');
    }
  };

  return (
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

          <Form.Item style={{ marginTop: '2rem' }}>
            <Button
              className="form-btn"
              type="primary"
              htmlType="submit"
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
          {/* <Form.Item>
            <Button
              size="large"
              className="form-btn btn-google"
              htmlType="submit"
            >
              Sign in with Google
            </Button>
          </Form.Item> */}
          <p style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register"> Register Now </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

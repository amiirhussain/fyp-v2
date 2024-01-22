import React, { useState } from 'react';
import { Button, Form, Input, Card, message, Alert, Spin } from 'antd';
import './auth.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/header/Header';
import OAuth from './OAuth';

const Register = () => {
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [msg, setMsg] = useState('');

  const [loading, setLoading] = useState(false);

  const userNameValidator = /^[a-zA-Z0-9_-]{3,20}$/;
  const fullNameValidator = /^[a-zA-Z\s'-]{2,50}$/;
  const passwordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!userNameValidator.test(values.userName)) {
      return;
    }

    if (!fullNameValidator.test(values.fullName)) {
      return;
    }

    if (!passwordValidator.test(values.password)) {
      setPasswordError(
        'Invalid password format (8 characters minimum, at least one uppercase letter, one lowercase letter, one digit, and one special character)',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:1337/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.status === 200) {
        setMsg(data.message);
        message.success('Email Sent Successfully');
      } else if (response.status === 400) {
        setEmailError('User already registered');
        message.error('User Already registered');
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setPasswordError('');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Navbar />
      <div className="form--container">
        <Card
          title="Register"
          bordered={false}
          style={{
            width: 500,
          }}
        >
          <Form
            layout="vertical"
            className="form"
            name="register-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div
              style={{
                display: 'flex ',
                gap: '10px',
                justifyContent: 'space-between',
              }}
            >
              <Form.Item
                name="userName"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your User name',
                  },
                  {
                    pattern: userNameValidator,
                    message:
                      'Invalid username format (3 to 20 characters, alphanumeric, underscores, hyphens)',
                  },
                ]}
              >
                <Input size="large" placeholder="User name" />
              </Form.Item>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Full name!',
                  },
                  {
                    pattern: fullNameValidator,
                    message:
                      'Invalid full name format (2 to 50 characters, alphabets, spaces, hyphens, apostrophes)',
                  },
                ]}
              >
                <Input size="large" placeholder="Full name" />
              </Form.Item>
            </div>

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
            {emailError && (
              <p style={{ color: 'red', marginBottom: '10px' }}>{emailError}</p>
            )}

            <div
              style={{
                display: 'flex ',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
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
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Confirm Password" />
              </Form.Item>
            </div>
            {passwordError && <Alert message={passwordError} type="error" />}

            {loading && <Spin />}

            {msg && <Alert message={msg} type="success" showIcon />}

            <Form.Item style={{ marginTop: '1rem' }}>
              <Button
                size="large"
                className="form-btn"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
            <OAuth />

            <p className="form-link">
              Already have an account? <Link to="/login"> Login Now </Link>
            </p>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Register;

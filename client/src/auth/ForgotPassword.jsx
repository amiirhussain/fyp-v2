// ForgotPassword.js
import React, { useState } from 'react';
import { Button, Form, Input, Card, Alert, Spin } from 'antd';
import Navbar from '../components/header/Header';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setErrMessage('');
      setSuccessMessage('');
      const response = await fetch(
        'http://localhost:1337/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setSuccessMessage(data.message);
        setLoading(false);
      } else {
        console.error(data.error);
        setErrMessage(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form--container">
        <Card title="Forgot Password" bordered={false} style={{ width: 400 }}>
          <Form
            layout="vertical"
            className="form"
            onFinish={handleResetPassword}
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
              <Input
                size="large"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            {loading && (
              <Spin tip="Loading" style={{ marginBottom: '10px' }}></Spin>
            )}
            {errMessage && (
              <Alert
                message={errMessage}
                type="error"
                showIcon
                style={{ marginBottom: '10px' }}
              />
            )}
            {successMessage && (
              <Alert
                message={successMessage}
                type="success"
                showIcon
                style={{ marginBottom: '10px' }}
              />
            )}

            <Form.Item>
              <Button
                className="form-btn"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Reset Password
              </Button>
            </Form.Item>
            <p style={{ textAlign: 'center' }}>
              Already have an account? <Link to="/login"> Login Now </Link>
            </p>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;

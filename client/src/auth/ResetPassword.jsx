import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const passwordValidator =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetToken } = useParams();
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setSuccessMessage('');
      setErrMessage('');

      if (!passwordValidator.test(newPassword)) {
        setErrMessage(
          'Password must meet the criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
        );
        return;
      }

      const resetPasswordUrl = `http://localhost:1337/auth/reset-password/${resetToken}`;
      const response = await fetch(resetPasswordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
          confirmPassword,
          resetToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message);
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        message.error(data.error);
        setErrMessage(data.error);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      message.error('Internal Server Error');
    }
  };

  return (
    <div className="form--container" style={{ height: '100vh' }}>
      <Card title="Reset Password" bordered={false} style={{ width: 400 }}>
        <Form layout="vertical" className="form" onFinish={handleSubmit}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
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
              size="large"
              type="primary"
              htmlType="submit"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;

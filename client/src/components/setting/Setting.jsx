import React, { useState } from 'react';
import { Modal, Button, Card, message } from 'antd';
import { useUserData } from '../../contexts/UserDataContext';
import { useNavigate } from 'react-router';

const Setting = () => {
  const [visible, setVisible] = useState(false);
  const { userData, loading } = useUserData();
  const userId = userData._id;

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/user/delete/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        },
      );

      if (response.ok) {
        console.log('User account deleted successfully');
        setVisible(false);
        message.success('User account deleted successfully');
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.error('Failed to delete user account');
      }
    } catch (error) {
      console.error('An error occurred during deletion:', error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Card title="Delete your Account" style={{ width: 300 }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Button danger onClick={showModal}>
          Delete Account
        </Button>
      )}
      <Modal
        title="Confirm Deletion"
        open={visible}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
      </Modal>
    </Card>
  );
};

export default Setting;

import React, { useEffect, useState } from 'react';
import { useUserData } from '../../contexts/UserDataContext';
import { Form, Input, Select, Button, message, Row, Modal } from 'antd';
import {
  BiMailSend,
  BiPhoneCall,
  BiPhone,
  BiReset,
  BiEdit,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';

const { Option } = Select;

const UserInfo = () => {
  const [form] = Form.useForm();
  const { userData, updateUser, resetPassword } = useUserData();
  const [passwordModal, setPasswordModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const passwordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const updatePassword = async (values) => {
    const isChangingPassword = values.password && values.confirmPassword;

    if (isChangingPassword) {
      if (values.password !== values.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      if (!passwordValidator.test(values.password)) {
        setPasswordError(
          'Invalid password format (8 characters minimum, at least one uppercase letter, one lowercase letter, one digit, and one special character)',
        );
        return;
      }
    }

    try {
      const resetResult = await resetPassword(userData._id, values.password);
      if (resetResult) {
        message.success('Password reset successfully');
        setPasswordModal(false);
      } else {
        message.error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      const updatedUser = await updateUser(userData._id, values);
      if (updatedUser) {
        message.success('User profile updated successfully');
        setProfileModal(false);
      } else {
        message.error('Failed to update user profile');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        phone: userData.phone,
        education: userData.education,
        profileImage: userData.profileImage,
        address: userData.address,
        userType: userData.userType,
      });
    }
  }, [userData]);

  return (
    <>
      <div className="user--profile">
        <div className="edit">
          <BiEdit className="icon" onClick={() => setProfileModal(true)} />
        </div>
        <div className="user--details">
          <img src={userData.profileImage} alt="" className="user--image" />
          <div className="user--info">
            <h2 className="user-name">{userData.fullName}</h2>
            <span className="user--qualification">
              {userData.userType}, {userData.education}
            </span>
            <span className="user--year">2020 to 2024</span>
            <Link
              className="reset--password"
              onClick={() => setPasswordModal(true)}
            >
              <BiReset className="icon" />
              Reset Password
            </Link>
          </div>
        </div>

        <div className="user--contact">
          <Row className="row">
            <span className="email">
              <BiMailSend className="icon" /> {userData.email}
            </span>
            <span className="phone">
              <BiPhoneCall className="icon" />
              {userData.phone}
            </span>
          </Row>
          <Row className="row">
            <span className="emergency">
              <BiPhone className="icon" />
              0926123456
            </span>
          </Row>
        </div>
      </div>
      {/* // reset passoword Modal */}
      <Modal
        title="Reset Password"
        open={passwordModal}
        onOk={() => setPasswordModal(false)}
        onCancel={() => setPasswordModal(false)}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={updatePassword}
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

          {passwordError && (
            <p style={{ color: 'red', marginBottom: '10px' }}>
              {passwordError}
            </p>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/*  update user detail */}
      <Modal
        title="Edit User Profile"
        centered
        open={profileModal}
        onOk={() => setProfileModal(false)}
        onCancel={() => setProfileModal(false)}
        width={1000}
      >
        {userData && (
          <Form
            form={form}
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 20,
            }}
            onFinish={onFinish}
          >
            <Form.Item label="Email" name="email">
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your Full Name!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Profile Image"
              name="profileImage"
              rules={[
                {
                  required: true,
                  message: 'Please input your Image URL!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone Number!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Education"
              name="education"
              rules={[
                {
                  required: true,
                  message: 'Please input your Education!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="userType"
              label="User Type"
              rules={[
                {
                  required: true,
                  message: 'Please select the User type',
                },
              ]}
            >
              <Select
                size="large"
                value={'Select User Type'}
                placeholder="Select User Type"
                style={{ width: 300 }}
              >
                <Option value="Student">Student</Option>
                <Option value="Working Professional">
                  Working Profeesional
                </Option>
                <Option value="Individual">Individual</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UserInfo;

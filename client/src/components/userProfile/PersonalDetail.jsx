import React, { useEffect, useState } from 'react';
import { useUserData } from '../../contexts/UserDataContext';

import { Form, Input, Select, Button, Modal, message } from 'antd';
import { BiEdit } from 'react-icons/bi';

const { Option } = Select;

const UserPersonalDetail = () => {
  const { userData, updateUser } = useUserData();
  const [form] = Form.useForm();
  const [personalModal, setPersonalModal] = useState(false);

  const onFinish = async (values) => {
    try {
      const updatedUser = await updateUser(userData._id, values);
      if (updatedUser) {
        message.success('Personal details updated successfully');
        setPersonalModal(false);
      } else {
        message.error('Failed to update personal details');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        perAddress: userData.perAddress,
        resAddress: userData.resAddress,
        gender: userData.gender,
        bloodGroup: userData.bloodGroup,
        dob: userData.dob,
      });
    }
  }, [userData]);

  return (
    <>
      <div className="personal--detail">
        <div className="user--header">
          <h2>Personal Details</h2>
          <BiEdit className="icon" onClick={() => setPersonalModal(true)} />
        </div>

        <Modal
          title="Edit Personal Details"
          centered
          open={personalModal}
          onOk={() => setPersonalModal(false)}
          onCancel={() => setPersonalModal(false)}
          width={1000}
        >
          {userData && (
            <Form
              form={form}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select the Gender',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select User Gender'}
                  placeholder="Select User Gender"
                  style={{ width: 150 }}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date Of Birth"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Date Of Birth!',
                  },
                ]}
              >
                <input type="date" className="date" />
              </Form.Item>
              <Form.Item
                label="Blood Group"
                name="bloodGroup"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Blood Group!',
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Permanent Address"
                name="perAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Permanent Address!',
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Residential Address"
                name="resAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Residential Address!',
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>

        <div className="personal--info">
          <div className="info">
            <div className="info-col">
              <div className="gender">
                <h4>Gender</h4>
                <span>{userData.gender ? userData.gender : 'NA'}</span>
              </div>
              <div className="blood-group">
                <h4>Blood Group</h4>
                <span>{userData.bloodGroup ? userData.bloodGroup : 'NA'}</span>
              </div>
            </div>
            <div className="info-col">
              <div className="dob">
                <h4>Date Of Birth</h4>
                <span>{userData.dob ? userData.dob : 'NA'}</span>
              </div>

              <div className="reg-email">
                <h4>Registered Email</h4>
                <span>{userData.email ? userData.email : 'NA'}</span>
              </div>
            </div>
          </div>

          <div className="address">
            <h4>Permanent Address</h4>

            <span className="permanent-address">
              {userData.perAddress ? userData.perAddress : 'NA'}
            </span>
          </div>
          <div className="address">
            <h4>Resdential Address</h4>
            <span className="residential-address">
              {userData.resAddress ? userData.resAddress : 'NA'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPersonalDetail;

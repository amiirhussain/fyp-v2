import React, { useEffect, useState } from 'react';
import { useUserData } from '../../contexts/UserDataContext';
import { Form, Input, Select, Button, message, Row, Modal } from 'antd';
import { BiEdit } from 'react-icons/bi';

const { Option } = Select;

const UserPreferencesDetail = () => {
  const { userData, updateUser } = useUserData();
  const [form] = Form.useForm();
  const [preferenceModal, setPreferenceModal] = useState(false);

  const onFinish = async (values) => {
    try {
      const updatedUser = await updateUser(userData._id, values);
      if (updatedUser) {
        message.success('Preferences details updated successfully');
        setPreferenceModal(false);
      } else {
        message.error('Failed to update preferences details');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        cleanliness: userData.cleanliness,
        socialHabits: userData.socialHabits,
        workOrStudyHours: userData.workOrStudyHours,
        foodPreferences: userData.foodPreferences,
        hobbies: userData.hobbies,
        personalityTraits: userData.personalityTraits,
        sleepHabits: userData.sleepHabits,
        petPreferences: userData.petPreferences,
        budget: userData.budget,
      });
    }
  }, [userData]);
  return (
    <>
      <div className="preferences--detail">
        <div className="user--header">
          <h2>Preferences Details</h2>
          <BiEdit className="icon" onClick={() => setPreferenceModal(true)} />
        </div>

        <Modal
          title="Edit User Prefernces"
          centered
          open={preferenceModal}
          onOk={() => setPreferenceModal(false)}
          onCancel={() => setPreferenceModal(false)}
          width={650}
        >
          <Form
            name="preferences"
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: '2rem' }}
          >
            <div
              style={{
                display: 'flex ',
                gap: '10px',
                justifyContent: 'space-between',
              }}
            >
              <Form.Item
                name="cleanliness"
                label="Cleanliness"
                rules={[
                  {
                    required: true,
                    message: 'Please select the cleanliness preference',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select Cleanliness'}
                  placeholder="Select Cleanliness"
                  style={{ width: 180 }}
                >
                  <Option value="Very Clean">Very Clean</Option>
                  <Option value="Clean">Clean</Option>
                  <Option value="Moderate">Moderate</Option>
                  <Option value="Messy">Messy</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="socialHabits"
                label="Social Habits"
                rules={[
                  {
                    required: true,
                    message: 'Please select the social habits preference',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select Social Habits'}
                  placeholder="Select Social Habits"
                  style={{ width: 180 }}
                >
                  <Option value="Very Social">Very Social</Option>
                  <Option value="Social">Social</Option>
                  <Option value="Introverted">Introverted</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="workOrStudyHours"
                label="Work or Study Hours"
                rules={[
                  {
                    required: true,
                    message: 'Please select the work or study hours preference',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select Work or Study Hours'}
                  placeholder="Select Work or Study Hours"
                  style={{ width: 180 }}
                >
                  <Option value="Morning Person">Morning Person</Option>
                  <Option value="Night Owl">Night Owl</Option>
                </Select>
              </Form.Item>
            </div>

            <div
              style={{
                display: 'flex ',
                gap: '10px',
                justifyContent: 'space-between',
              }}
            >
              <Form.Item
                name="foodPreferences"
                label="Food Preferences"
                rules={[
                  {
                    required: true,
                    message: 'Please select the food preferences',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select Food Preferences'}
                  placeholder="Select Food Preferences"
                  style={{ width: 180 }}
                >
                  <Option value="Vegetarian">Vegetarian</Option>
                  <Option value="Vegan">Vegan</Option>
                  <Option value="Non-Vegetarian">Non-Vegetarian</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="sleepHabits"
                label="Sleep Habits"
                rules={[
                  {
                    required: true,
                    message: 'Please select the sleep habits preference',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select Sleep Habits'}
                  placeholder="Select Sleep Habits"
                  style={{ width: 180 }}
                >
                  <Option value="Early Riser">Early Riser</Option>
                  <Option value="Night Owl">Night Owl</Option>
                  <Option value="Regular">Regular</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="petPreferences"
                label="Pet Preferences"
                rules={[
                  {
                    required: true,
                    message: 'Please select the pet preferences',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select Pet Preferences'}
                  placeholder="Select Pet Preferences"
                  style={{ width: 180 }}
                >
                  <Option value="Likes Pets">Likes Pets</Option>
                  <Option value="No Pets">No Pets</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              name="hobbies"
              label="Hobbies"
              rules={[
                {
                  required: true,
                  message: 'Please select at least one hobby',
                },
              ]}
            >
              <Select
                size="large"
                mode="multiple"
                placeholder="Select Hobbies"
                style={{ width: '100%' }}
              >
                <Option value="Reading">Reading</Option>
                <Option value="Gaming">Gaming</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Music">Music</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="personalityTraits"
              label="Personality Traits"
              rules={[
                {
                  required: true,
                  message: 'Please select at least one personality trait',
                },
              ]}
            >
              <Select
                size="large"
                mode="multiple"
                placeholder="Select Personality Traits"
                style={{ width: '100%' }}
              >
                <Option value="Friendly">Friendly</Option>
                <Option value="Organized">Organized</Option>
                <Option value="Adventurous">Adventurous</Option>
                <Option value="Easygoing">Easygoing</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="budget"
              label="Budget"
              rules={[
                {
                  required: true,
                  message: 'Please enter Budget',
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
        </Modal>
        <div className="preferences">
          <div className="pref-col">
            <div className="cleanliness">
              <h4>Cleanliness</h4>
              <span>{userData.cleanliness ? userData.cleanliness : 'NA'}</span>
            </div>
            <div className="socialHabits">
              <h4>Social Habits</h4>
              <span>
                {userData.socialHabits ? userData.socialHabits : 'NA'}
              </span>
            </div>
            <div className="workOrStudyHours">
              <h4>Work or Study Hours</h4>
              <span>
                {userData.workOrStudyHours ? userData.workOrStudyHours : 'NA'}
              </span>
            </div>
          </div>
          <div className="pref-col">
            <div className="hobbies">
              <h4>Hobbies</h4>
              <span>{userData.hobbies ? userData.hobbies + '' : 'NA'}</span>
            </div>
            <div className="foodPreferences">
              <h4>Food Preferences</h4>
              <span>
                {userData.foodPreferences ? userData.foodPreferences : 'NA'}
              </span>
            </div>
            <div className="personalityTraits">
              <h4>Personality Traits</h4>
              <span>
                {userData.personalityTraits
                  ? userData.personalityTraits + ''
                  : 'NA'}
              </span>
            </div>
          </div>
          <div className="pref-col">
            <div className="sleepHabits">
              <h4>Sleep Habits</h4>
              <span>{userData.sleepHabits ? userData.sleepHabits : 'NA'}</span>
            </div>
            <div className="petPreferences">
              <h4>Pet Preferences</h4>
              <span>
                {userData.petPreferences ? userData.petPreferences : 'NA'}
              </span>
            </div>
            <div className="budget">
              <h4>Budget</h4>
              <span>
                {userData.budget
                  ? `Rs${userData.budget.toLocaleString()}`
                  : 'NA'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPreferencesDetail;

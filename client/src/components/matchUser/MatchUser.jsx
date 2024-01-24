import React, { useState, useEffect } from 'react';
import {
  Layout,
  List,
  Card,
  Progress,
  Typography,
  Spin,
  Modal,
  Avatar,
  Badge,
  Button,
  Flex,
} from 'antd';
import './matchUser.css';
const { Content } = Layout;
const { Meta } = Card;

const MatchUser = () => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(matchingUsers);
  useEffect(() => {
    const fetchMatchingUsers = async () => {
      try {
        const response = await fetch(
          'http://localhost:1337/user/matchingUsers',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token'),
            },
          },
        );

        if (!response.ok) {
          throw new Error('Error fetching matching users');
        }

        const data = await response.json();
        setMatchingUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchMatchingUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Layout style={{ padding: '10px 0' }}>
      <Typography.Title level={2} strong style={{ color: 'gray' }}>
        User Matched
      </Typography.Title>
      <Content style={{ padding: '20px' }}>
        {loading && <Spin />}

        {!loading && (
          <List
            grid={{ gutter: 16, column: { xs: 1, sm: 2, md: 3, lg: 4 } }}
            dataSource={matchingUsers}
            renderItem={(user) => (
              <List.Item onClick={() => openModal(user)}>
                <Card
                  style={{ width: 300 }}
                  hoverable
                  cover={
                    <img
                      alt={user.fullName}
                      src={user.profileImage}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                      }}
                    />
                  }
                >
                  <Meta title={user.fullName} description={user.email} />
                  <span>Gender : {user.gender}</span>
                  <br />
                  <Progress type="circle" percent={user.matchingPercentage} />
                </Card>
              </List.Item>
            )}
          />
        )}

        <Modal
          title={selectedUser && 'User Detail'}
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {selectedUser && (
            <Card
              style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
              }}
              cover={
                <div
                  style={{
                    position: 'relative',
                    height: '250px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    alt={selectedUser.fullName}
                    src={selectedUser.profileImage}
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                  {selectedUser.verified && (
                    <Badge
                      status="success"
                      text="Verified"
                      style={{
                        background: 'gray',
                        color: '#fff',
                        padding: ' 6px 10px',
                        borderRadius: '6px',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                    />
                  )}
                  {!selectedUser.verified && (
                    <Badge
                      status="error"
                      text="Not Verified"
                      style={{
                        background: 'gray',
                        color: '#fff',
                        padding: ' 6px 10px',
                        borderRadius: '6px',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                    />
                  )}
                </div>
              }
            >
              <Meta
                avatar={<Avatar src={selectedUser.profileImage} />}
                title={selectedUser.fullName}
                description={
                  <Flex vertical gap="2px">
                    <p>Email: {selectedUser.email}</p>
                    <p>
                      Phone Number:{' '}
                      {selectedUser.phone ? selectedUser.phone : 'NA'}
                    </p>
                    <p>
                      Education:{' '}
                      {selectedUser.education ? selectedUser.education : 'NA'}
                    </p>

                    <p>
                      Address:{' '}
                      {selectedUser.resAddress ? selectedUser.resAddress : 'NA'}
                    </p>
                    <p>
                      Budget: {selectedUser.budget ? selectedUser.budget : 'NA'}
                    </p>
                    <p>
                      Profile Matched:{' '}
                      {selectedUser.matchingPercentage
                        ? `${selectedUser.matchingPercentage}%`
                        : 'NA'}
                    </p>
                  </Flex>
                }
              />
              <Button
                type="primary"
                style={{ width: '100%', marginTop: '2rem' }}
              >
                Chat
              </Button>
            </Card>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default MatchUser;

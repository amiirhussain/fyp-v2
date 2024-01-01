import React, { useState, useEffect } from 'react';
import { Layout, List, Card, Progress, Typography, Spin, Alert } from 'antd';

const { Content } = Layout;
const { Meta } = Card;

const MatchUser = () => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <List.Item>
                <Card
                  style={{ width: 280 }}
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
                  <br />
                  <Progress type="circle" percent={user.matchingPercentage} />
                </Card>
              </List.Item>
            )}
          />
        )}
      </Content>
    </Layout>
  );
};

export default MatchUser;

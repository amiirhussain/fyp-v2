import React, { useState, useEffect } from 'react';
import useGetUserData from '../../hooks/useGetUserData';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, theme, Button, Dropdown, message, Result } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import SideMenu from '../../components/sideMenu/SideMenu';
import './dashboard.css';
import AddApartment from '../../components/addApartment/AddApartment';
import { ApartmentProvider } from '../../context/ApartContext';

const items = [
  {
    key: '1',
    label: (
      <Link
        to="/"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('', { replace: true });
        }}
      >
        Logout
      </Link>
    ),
    icon: <LogoutOutlined />,
  },
];

const Dashboard = ({ setUserLoggedIn }) => {
  const { userData, loading } = useGetUserData({
    UserEndpoint: 'user/single-user',
  });
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      message.error('Please login here');
    }
    setUserLoggedIn(!!isAuthenticated);
  }, [isAuthenticated, setUserLoggedIn]);

  const handleMenuClick = (key) => {
    setSelectedMenuItem(key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <SideMenu onMenuClick={handleMenuClick} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: '0 3rem',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ color: 'gray' }}>Dashboard</h2>

          <div className="top-user-header">
            <div className="logged--user">
              <img src={userData.profileImage} alt="" />
              <h3>{userData.fullName}</h3>
            </div>

            <div className="header--divider"></div>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
            >
              <Button>
                <UserOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            {selectedMenuItem === 'dashboard' && (
              <>
                <ApartmentProvider>
                  <AddApartment />
                  {/* Other components that need access to apartment context */}
                </ApartmentProvider>
                {/* <AddApartment /> */}
              </>
            )}
            {/* {selectedMenuItem === 'profile' && <UserProfile />} */}

            {selectedMenuItem === 'analytics' && (
              <Result
                status="info"
                title="Analytics are Coming Soon!"
                subTitle="We're working hard to bring you awesome features. Stay tuned!"
                extra={
                  <Button type="primary" disabled>
                    Coming Soon
                  </Button>
                }
              />
            )}
            {selectedMenuItem === 'chats' && (
              <Result
                status="info"
                title="Chats are Coming Soon!"
                subTitle="We're working hard to bring you awesome features. Stay tuned!"
                extra={
                  <Button type="primary" disabled>
                    Coming Soon
                  </Button>
                }
              />
            )}
            {selectedMenuItem === 'setting' && (
              <Result
                status="info"
                title="Settings are Coming Soon!"
                subTitle="We're working hard to bring you awesome features. Stay tuned!"
                extra={
                  <Button type="primary" disabled>
                    Coming Soon
                  </Button>
                }
              />
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Space Seekers ©2023 All Rights Reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

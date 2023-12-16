import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, theme, Button, Dropdown, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import SideMenu from '../../components/sideMenu/SideMenu';
import './dashboard.css';
import UserProfileLogo from '../../components/userProfileLogo/UserProfileLogo';
import { UserDataProvider } from '../../contexts/UserDataContext';

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
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem('selectedMenuItem') || 'dashboard',
  );

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
    localStorage.setItem('selectedMenuItem', key);
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
            <UserDataProvider>
              <UserProfileLogo />
            </UserDataProvider>
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
            <Outlet />
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

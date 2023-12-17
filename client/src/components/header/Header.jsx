import React from 'react';
import { Menu, Layout, Button, Row, Col, Flex } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const { Header } = Layout;

const Navbar = () => {
  const isUserLoggedIn = localStorage.getItem('token');

  const menuItems = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">About</Link>,
    },
    {
      key: 'services',
      label: <Link to="/services">Services</Link>,
    },
    {
      key: 'contact',
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  return (
    <Header className="header">
      <Row className="nav--bar">
        <Col span={7}>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        <Col span={12}>
          <Menu
            defaultSelectedKeys="home"
            mode="horizontal"
            className="menu--list"
            items={menuItems}
          />
        </Col>
        <Col span={5}>
          {isUserLoggedIn ? (
            <Flex gap="large">
              <Link to="/dashboard">
                <Button type="primary">Dashoard</Button>
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('selectedMenuItem');
                }}
              >
                <Button>Logout</Button>
              </Link>
            </Flex>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <Button type="primary" icon={<LoginOutlined />}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary" icon={<LogoutOutlined />}>
                  Register
                </Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;

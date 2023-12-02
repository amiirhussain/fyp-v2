import React from 'react';
import { Menu, Layout, Button, Row, Col } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="header">
      <Row className="nav--bar">
        <Col span={7}>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        <Col span={12}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={5}>
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
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;

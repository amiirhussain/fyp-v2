import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  AreaChartOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import './sideMenu.css';
import logoImage from '../../assets/logo.png';

const SideMenu = ({ onMenuClick }) => {
  const menuItems = [
    {
      key: 'dashboard',
      label: <Link to="">Dashboard</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 'analytics',
      label: <Link to="analytics">Analytics</Link>,
      icon: <AreaChartOutlined />,
    },
    {
      key: 'chats',
      label: <Link to="chats">Chats</Link>,
      icon: <MessageOutlined />,
    },
    {
      key: 'profile',
      label: <Link to="profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'setting',
      label: <Link to="setting">Setting</Link>,
      icon: <SettingOutlined />,
    },
  ];

  const handleClick = ({ key }) => {
    onMenuClick(key);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem('selectedMenuItem');
          }}
          className="logo-icon"
        >
          <img src={logoImage} alt="" />
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            Space Seekers
          </h4>
        </Link>
      </div>

      <Menu
        defaultSelectedKeys="dashboard"
        theme="dark"
        className="menu-bar"
        items={menuItems}
        selectedKeys={[localStorage.getItem('selectedMenuItem') || 'dashboard']}
        onClick={handleClick}
      />
    </div>
  );
};

export default SideMenu;

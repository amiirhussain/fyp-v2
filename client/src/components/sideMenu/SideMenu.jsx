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
  const handleClick = ({ key }) => {
    onMenuClick(key);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/" className="logo-icon">
          <img src={logoImage} alt="" />
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            Space Seekers
          </h4>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className="menu-bar"
        selectedKeys={[localStorage.getItem('selectedMenuItem') || 'dashboard']}
        onClick={handleClick}
      >
        <Menu.Item key="dashboard" icon={<HomeOutlined />}>
          <Link to="">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="analytics" icon={<AreaChartOutlined />}>
          <Link to="analytics">Analytics</Link>
        </Menu.Item>
        <Menu.Item key="chats" icon={<MessageOutlined />}>
          <Link to="chats">Chats</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="profile">Profile</Link>
        </Menu.Item>

        <Menu.Item key="setting" icon={<SettingOutlined />}>
          <Link to="setting">Setting</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;

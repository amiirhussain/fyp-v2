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
        <div className="logo-icon">
          <img src={logoImage} alt="" />
          <h4>Space Seekers</h4>
        </div>
      </div>
      <Menu
        onClick={handleClick}
        theme="dark"
        mode="inline"
        className="menu-bar"
        defaultSelectedKeys={['dashboard']}
      >
        <Menu.Item key="dashboard" icon={<HomeOutlined />}>
          Dashboard
        </Menu.Item>

        <Menu.Item key="analytics" icon={<AreaChartOutlined />}>
          Analytics
        </Menu.Item>
        <Menu.Item key="chats" icon={<MessageOutlined />}>
          Chats
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>
          Setting
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;

import React from 'react';
import { Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Text } = Typography;

const CustomFooter = () => {
  return (
    <Footer
      style={{
        color: '#fff',
        textAlign: 'center',
        padding: '2rem 10%',
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text strong style={{ fontSize: '16px', color: 'gray' }}>
          Space Seeker ©2023 All rights reserved
        </Text>
        <div>
          <Link to="/" style={{ color: 'gray', marginLeft: '20px' }}>
            Home
          </Link>
          <Link to="/about" style={{ color: 'gray', marginLeft: '20px' }}>
            About
          </Link>
          <Link to="/contact" style={{ color: 'gray', marginLeft: '20px' }}>
            Contact
          </Link>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;

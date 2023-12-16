import { Button, Flex, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Flex align="center" justify="center" style={{ height: '100vh' }}>
      <Result
        status="404"
        title="404 - Page Not Found"
        subTitle="The page you are trying to reach does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Go to Home</Button>
          </Link>
        }
      />
    </Flex>
  );
};

export default PageNotFound;

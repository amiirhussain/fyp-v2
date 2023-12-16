import { Button, Result } from 'antd';
import React from 'react';

const ComingSoon = ({ pageTitle }) => {
  return (
    <Result
      status="info"
      title={`${pageTitle} are Coming Soon!`}
      subTitle="We're working hard to bring you awesome features. Stay tuned!"
      extra={
        <Button type="primary" disabled>
          Coming Soon
        </Button>
      }
    />
  );
};

export default ComingSoon;

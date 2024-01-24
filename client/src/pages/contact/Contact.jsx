import React from 'react';
import { Typography, Form, Input, Button, Row, Col, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Navbar from '../../components/header/Header';
import CustomFooter from '../../components/footer/Footer';

const { Title, Paragraph } = Typography;

const Contact = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <>
      <Navbar />
      <section className="contact" style={{ height: '70vh' }}>
        <Row>
          <Col>
            <Space direction="vertical" size="large">
              <Title level={2}>Contact Us</Title>
              <Paragraph>
                Have questions or feedback? Reach out to us Email, and we'll get
                back to you as soon as possible.
              </Paragraph>
              <Typography.Title level={5} strong>
                Email:
                <Typography.Text> spaceseekersfyp@gmail.com</Typography.Text>
              </Typography.Title>
            </Space>
          </Col>
        </Row>
      </section>
      <CustomFooter />
    </>
  );
};

export default Contact;

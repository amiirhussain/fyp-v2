import React from 'react';
import { Layout, Typography, Card, Row, Col, Space } from 'antd';
import {
  BulbOutlined,
  DatabaseOutlined,
  SearchOutlined,
  MessageOutlined,
  AppstoreAddOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import CustomFooter from '../../components/footer/Footer';
import Navbar from '../../components/header/Header';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Services = () => {
  const services = [
    {
      title: 'Advanced Recommendation',
      description:
        'Our cutting-edge recommendation engine utilizes machine learning techniques to suggest personalized housing and roommate matches.',
      icon: <BulbOutlined />,
    },
    {
      title: 'Consolidated Listings',
      description:
        'Space Seekers centralizes housing and roommate listings from diverse sources, providing a comprehensive and easily accessible database.',
      icon: <DatabaseOutlined />,
    },
    {
      title: 'Advanced Search and Filtering',
      description:
        'Empower your search with advanced functionalities, allowing users to fine-tune criteria such as location, price, and amenities.',
      icon: <SearchOutlined />,
    },
    {
      title: 'In-App Communications',
      description:
        'Facilitate secure and efficient in-app messaging, enabling seamless communication between users to discuss property details and roommate compatibility.',
      icon: <MessageOutlined />,
    },
    {
      title: 'Property Listing Management',
      description:
        'Users can effortlessly post, edit, and manage property listings, including rentals, sublets, and room sharing.',
      icon: <AppstoreAddOutlined />,
    },
    {
      title: 'Secure Payments',
      description:
        'Implementation of a secure payment system to simplify rental transactions and financial aspects of the housing process.',
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <>
      <Navbar />
      <section
        className="services"
        style={{ paddingTop: '30px', height: '75vh' }}
      >
        <Content>
          <Title level={2}>Our Services</Title>
          <Paragraph>
            Explore the features and services that Space Seekers offers to make
            your housing search and roommate matching experience seamless and
            efficient.
          </Paragraph>

          <Row gutter={[16, 16]}>
            {services.map((service, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={8}>
                <Card
                  title={service.title}
                  extra={<Space>{service.icon}</Space>}
                >
                  <Paragraph>{service.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </section>
      <CustomFooter />
    </>
  );
};

export default Services;

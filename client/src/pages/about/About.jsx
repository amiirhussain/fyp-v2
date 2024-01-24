import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import Navbar from '../../components/header/Header';
import CustomFooter from '../../components/footer/Footer';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <>
      <Navbar />
      <section className="about">
        <Title level={2}>About Space Seekers</Title>
        <Paragraph>
          Finding suitable housing and compatible roommates can be a daunting
          task, particularly for university students, young professionals, and
          individuals relocating to unfamiliar cities. Space Seekers has emerged
          as a solution to streamline this process.
        </Paragraph>

        <Title level={3}>Our Mission</Title>
        <Paragraph>
          Space Seekers aims to simplify the search and matching process, making
          it easier for individuals to find housing arrangements that suit their
          needs and lifestyle, all while fostering a sense of security and
          community.
        </Paragraph>

        <Title level={3}>Key Features</Title>
        <Row gutter={[16, 16]} className="feature-row">
          <Col xs={24} sm={24} md={8}>
            <Card title="Advanced Recommendation">
              The project incorporates a cutting-edge recommendation engine
              utilizing machine learning techniques.
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card title="Consolidated Listings">
              Space Seekers centralizes housing and roommate listings from
              diverse sources.
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card title="Advanced Search and Filtering">
              The platform features advanced search functionalities, empowering
              users to fine-tune their search criteria.
            </Card>
          </Col>
        </Row>

        <Title level={3}>Objectives</Title>
        <Paragraph>
          The key objectives of Space Seekers include prioritizing
          compatibility, streamlining the search process, enhancing safety, and
          providing a comprehensive solution.
        </Paragraph>
      </section>
      <CustomFooter />
    </>
  );
};

export default About;

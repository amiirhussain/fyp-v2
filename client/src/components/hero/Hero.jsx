import React from 'react';
import './hero.css';
import { Button, Card, Form, Select, Flex } from 'antd';

import {
  HomeOutlined,
  UnorderedListOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import heroImge from '../../assets/hero-image.png';
import heroCard1 from '../../assets/hero-card-01.png';
import heroCard2 from '../../assets/hero-card-02.png';
import heroCard3 from '../../assets/hero-card-03.png';

const Hero = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <section className="hero">
      <div className="hero--container">
        <div className="hero--search-filter">
          <div className="search-details">
            <div className="hero-detail">
              <h1 className="hero--title">
                Come, live
                <br />
                the new kind,
                <br /> of Living.
              </h1>
              <div className="search--filter-box">
                <Form>
                  <div className="search-box">
                    {/* <Select
                    size="large"
                    label="Room Type"
                    placeholder="Room Type"
                    onChange={handleChange}
                    options={[
                      {
                        value: 'one-bed',
                        label: '1 Bed',
                      },
                      {
                        value: 'two-bed',
                        label: '2 Bed',
                      },
                      {
                        value: 'three-bed',
                        label: '3 Bed',
                      },
                      {
                        value: 'four-bed',
                        label: '4 Bed',
                        disabled: true,
                      },
                    ]}
                  /> */}

                    <Select
                      className="hero-filter-input"
                      size="large"
                      placeholder="Property Type"
                      onChange={handleChange}
                      options={[
                        {
                          value: 'hostel',
                          label: 'Hostel',
                        },
                        {
                          value: 'private-space',
                          label: 'Private Room',
                        },
                        {
                          value: 'shared-house',
                          label: 'Sharing House',
                        },
                      ]}
                    />
                    <Select
                      className="hero-filter-input"
                      size="large"
                      placeholder="Location"
                      onChange={handleChange}
                      options={[
                        {
                          value: 'islamabad',
                          label: 'Islamabad',
                        },
                        {
                          value: 'rawalpindi',
                          label: 'Rawalpindi',
                        },
                      ]}
                    />
                    <Button
                      className="filter-search-btn"
                      type="primary"
                      size="large"
                    >
                      Search
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="hero--image">
            <img src={heroImge} alt="" />
          </div>
        </div>
        <div className="hero--card-categoires">
          <div className="hero--card">
            <div className="card-detail">
              <h4>Modern Student Housing</h4>
              <ArrowRightOutlined className="card-icon" />
            </div>
            <div className="card-image">
              <img src={heroCard1} alt="" />
            </div>
          </div>
          <div className="hero--card">
            <div className="card-detail">
              <h4>Co-living for Professionals</h4>
              <ArrowRightOutlined className="card-icon" />
            </div>
            <div className="card-image">
              <img src={heroCard2} alt="" />
            </div>
          </div>
          <div className="hero--card">
            <div className="card-detail">
              <h4>Managed Apartments</h4>
              <ArrowRightOutlined className="card-icon" />
            </div>
            <div className="card-image">
              <img src={heroCard3} alt="" />
            </div>
          </div>
          {/* <div className="hero-card"></div>
          <div className="hero-card"></div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;

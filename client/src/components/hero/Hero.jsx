import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd';
import { useNavigate } from 'react-router';
import heroImge from '../../assets/hero-image.png';
import heroCard1 from '../../assets/hero-card-01.png';
import heroCard2 from '../../assets/hero-card-02.png';
import heroCard3 from '../../assets/hero-card-03.png';

import './hero.css';

const Hero = () => {
  const navigate = useNavigate();
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
              <Card style={{ width: 500, border: '1px solid gray' }}>
                <Flex justify="space-between">
                  <h2>Search Smarter, Find Better</h2>
                  <Button
                    onClick={() => {
                      navigate('/filter');
                    }}
                  >
                    Search
                  </Button>
                </Flex>
              </Card>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;

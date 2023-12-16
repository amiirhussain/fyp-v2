import React from 'react';
import './allList.css';
import useFetch from '../../hooks/useFetch';
import { SiZerodha } from 'react-icons/si';
import { FaLocationDot, FaBath, FaBed } from 'react-icons/fa6';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const AllList = () => {
  const { fetchData: apartmentData } = useFetch({
    UrlEndpoint: 'apartment/get-all',
  });

  console.log(apartmentData);
  return (
    <section className="list--section">
      <h2 className="section--title">Latest Listed Rooms</h2>
      <div className="home--list--container">
        {apartmentData.map((item) => (
          <Link
            to={`/apartment/${item._id}`}
            key={item._id}
            className="apartment--list"
          >
            <div className="list--image">
              <img src={item.imageUrls[0]} alt={item.title} />
            </div>

            <div className="list-detail">
              <h2 className="list-title">{item.title}</h2>

              <div
                className={`list-status ${
                  item.isAvailble ? 'list-status-true' : 'list-status-false'
                }`}
              >
                {item.isAvailble ? 'Available' : 'Not Available'}
              </div>

              <div className="list-type">{item.type}</div>
              <span className="apartment-address">
                <FaLocationDot className="icon" /> {item.address}
              </span>
              <div className="apartment-detail">
                <span>
                  <SiZerodha className="icon" />
                  {item.size}
                </span>
                <span>
                  <FaBed className="icon" />
                  {`${item.bedrooms} Bed`}
                </span>
                <span>
                  <FaBath className="icon" />
                  {`${item.bathrooms} Bath`}
                </span>
              </div>

              <div className="divider"></div>

              <div className="apartment-about">
                <div className="apartment-rent">
                  <span className="rent--slogan">Start from</span>
                  <span className="rent-mount">
                    {item.rent
                      ? `Rs${item.rent.toLocaleString()}`
                      : 'Rs15,499 '}
                    <span>/mo*</span>
                  </span>
                </div>

                <Space className="list--action">
                  <Button type="primary">Chat</Button>
                  <Button>Schedule a visit</Button>
                </Space>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllList;

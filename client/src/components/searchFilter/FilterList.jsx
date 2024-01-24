import React from 'react';
import { List, Space, Button, Flex } from 'antd';
import { SiZerodha } from 'react-icons/si';
import { FaLocationDot, FaBath, FaBed } from 'react-icons/fa6';
const FilterList = ({ filteredApartments }) => {
  console.log(filteredApartments);
  return (
    <List
      className="list--container"
      itemLayout="vertical"
      dataSource={filteredApartments}
      renderItem={(apartment) => (
        <List.Item key={apartment._id}>
          <div className="apartment--list">
            <div className="list--image">
              <img src={apartment.imageUrls} alt={apartment.title} />
            </div>
            <div className="list-detail" style={{ width: '80%' }}>
              <div className="list--header">
                <h2 className="list-title" style={{ fontSize: '16px' }}>
                  {apartment.title}
                </h2>
              </div>

              <Flex gap="large" align="center" style={{ padding: '10px 0 ' }}>
                <div className="list-genderType">{apartment.genderType}</div>
                <div className="list-type">{apartment.type}</div>
              </Flex>
              <Flex align="center" gap="small">
                <span className="apartment-address">
                  <FaLocationDot className="icon" /> {apartment.address}
                </span>
                <Flex align="center" gap="large">
                  <span>Furnished: {apartment.furnished ? 'Yes' : 'No'}</span>
                  <span>Parking: {apartment.parking ? 'Yes' : 'No'}</span>
                </Flex>
              </Flex>
              <div className="apartment-detail">
                <span>
                  <SiZerodha className="icon" />
                  {`${apartment.size} sq ft.`}
                </span>
                <span>
                  <FaBed className="icon" />
                  {`${apartment.bedrooms} Bed`}
                </span>
                <span>
                  <FaBath className="icon" />
                  {`${apartment.bathrooms} Bath`}
                </span>
              </div>

              <div className="divider"></div>

              <div className="apartment-about">
                <div className="apartment-rent">
                  <span className="rent--slogan">Start from</span>
                  <span className="rent-mount">
                    {apartment.rent
                      ? `Rs${apartment.rent.toLocaleString()}`
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
          </div>
        </List.Item>
      )}
    />
  );
};

export default FilterList;

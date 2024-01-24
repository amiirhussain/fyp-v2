import { useParams } from 'react-router-dom';
import './apartmentDetail.css';
import { SiZerodha } from 'react-icons/si';
import { FaBed, FaBath } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch';
import Navbar from '../header/Header';
import { Button, Flex, Space } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';
import CustomFooter from '../footer/Footer';

const ApartmentDetail = () => {
  const { id } = useParams();
  const { fetchData: apartmentData, loading } = useFetch({
    UrlEndpoint: `apartment/${id}`,
  });

  return (
    <>
      <Navbar />
      <section className="apartment--detail">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="title-header">
              <h1 className="apart-title">{apartmentData.title}</h1>
              <Flex gap="large" align="center" style={{ padding: '10px 0 ' }}>
                <div className="genderType">{apartmentData.genderType}</div>
                <div className="type">{apartmentData.type}</div>
              </Flex>
            </div>
            <span className="apartment-address">
              <FaLocationDot className="icon" /> {apartmentData.address}
            </span>

            <img
              className="apart-image"
              src={apartmentData.imageUrls}
              alt={apartmentData.title}
            />
            <span className="apart-avail">
              {apartmentData.isAvailble ? 'Available' : 'Not Available'}
            </span>

            <div className="apart-rent">
              <span className="rent-slogan">Start from</span>
              <span className="rent-mount">
                {apartmentData.rent
                  ? `Rs${apartmentData.rent.toLocaleString()}`
                  : 'Rs15,499 '}
                <span>/mo*</span>
              </span>
            </div>

            <div className="apart-detail">
              <span>
                <SiZerodha className="icon" />
                {apartmentData.size}
              </span>
              <span>
                <FaBed className="icon" />
                {`${apartmentData.bedrooms} Bed`}
              </span>
              <span>
                <FaBath className="icon" />
                {`${apartmentData.bathrooms} Bath`}
              </span>
            </div>

            <h4>Amenities</h4>
            <div className="apart-amentites">
              {apartmentData.usps > 0
                ? apartmentData.usps.map((amentity) => (
                    <>
                      <span>{amentity.toUpperCase()}</span>
                    </>
                  ))
                : 'NA'}
            </div>

            <Space style={{ marginTop: '1rem' }}>
              <Button size="large" style={{ width: 200 }} type="primary">
                Chat
              </Button>
              <Button size="large" style={{ width: 200 }}>
                Schedule a visit
              </Button>
            </Space>
          </>
        )}
      </section>
      <CustomFooter />
    </>
  );
};

export default ApartmentDetail;

import { useParams } from 'react-router-dom';
import './apartmentDetail.css';
import { SiZerodha } from 'react-icons/si';
import { FaBed, FaBath } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch';
import Navbar from '../header/Header';

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
              <span className="type">{apartmentData.type}</span>
            </div>
            <p>{apartmentData.address}</p>
            <img
              className="apart-image"
              src={apartmentData.imageUrls[0]}
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
              <span>Air Conditiong</span>
              <span>Attach Washroom</span>
              <span>Spacious Cupboard</span>
            </div>
            <h4>Services</h4>
            <div className="apart-services">
              <span>Hot and Delicious Meals</span>
              <span>High-Speed WIFI</span>
              <span>Laundry Service</span>
              <span>Washing Machine</span>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ApartmentDetail;

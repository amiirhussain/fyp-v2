import { List, Space, Button, Popconfirm, message, Flex } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SiZerodha } from 'react-icons/si';
import { FaLocationDot, FaBath, FaBed } from 'react-icons/fa6';
import './apartmentList.css';

const ApartmentList = ({ apartments, handleEdit, handleDelete }) => {
  const handleDeleteConfirm = (apartmentId) => {
    handleDelete(apartmentId);
  };

  const handleDeleteCancel = () => {
    message.info('Delete action canceled');
  };

  return (
    <List
      className="list--container"
      itemLayout="vertical"
      dataSource={apartments}
      renderItem={(apartment) => (
        <List.Item key={apartment._id}>
          <div className="apartment--list">
            <div className="apartment-action">
              <Button onClick={() => handleEdit(apartment)}>
                <EditOutlined />
              </Button>
              <Popconfirm
                title="Are you sure to delete this apartment?"
                onConfirm={() => handleDeleteConfirm(apartment._id)}
                onCancel={handleDeleteCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button>
                  <DeleteOutlined className="delte-btn" />
                </Button>
              </Popconfirm>
            </div>
            <div className="list--image">
              <img src={apartment.imageUrls} alt={apartment.title} />
            </div>
            <div className="list-detail">
              <div className="list--header">
                <h2 className="list-title">{apartment.title}</h2>
              </div>

              <Flex gap="large" align="center" style={{ padding: '10px 0 ' }}>
                <div className="list-genderType">{apartment.genderType}</div>
                <div className="list-type">{apartment.type}</div>
              </Flex>
              <span className="apartment-address">
                <FaLocationDot className="icon" /> {apartment.address}
              </span>
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

export default ApartmentList;

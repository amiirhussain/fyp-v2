import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Input, Select, Checkbox, message } from 'antd';
import { ApartmentContext } from '../../context/ApartContext';
import ApartmentList from '../apartmentList/ApartmentList';

const { Option } = Select;

const AddApartment = () => {
  const {
    apartments,
    loading,
    error,
    fetchUserApartments,
    addApartment,
    updateApartment,
    deleteApartment,
  } = useContext(ApartmentContext);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (error) {
      message.error(error);
    }

    // Reset form when closing modal or switching edit mode
    if (!open || !editMode) {
      form.resetFields();
    }
  }, [open, editMode, error]);

  const handleSuccess = () => {
    console.log('Handling success'); // Check if this log is displayed in the console
    setOpen(false);
    message.success(
      editMode
        ? 'Apartment Updated successfully'
        : 'Apartment Added successfully',
    );
    fetchUserApartments();
  };

  const handleSubmit = (values) => {
    try {
      addApartment(values);
      handleSuccess();
    } catch (error) {
      console.error('Error adding apartment:', error);
    }
  };

  const handleEditSubmit = (values) => {
    try {
      if (editData) {
        updateApartment(editData._id, values);
        handleSuccess();
      } else {
        console.error('Edit data is null');
      }
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  const handleDelete = (apartmentId) => {
    try {
      deleteApartment(apartmentId);
      handleSuccess();
      // if (window.confirm('Are you sure you want to delete this apartment?')) {
      // }
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  const handleEdit = (apartment) => {
    setOpen(true);
    setEditMode(true);
    setEditData(apartment);
    form.setFieldsValue({
      type: apartment.type,
      title: apartment.title,
      imageUrl:
        apartment.imageUrls && apartment.imageUrls.length > 0
          ? apartment.imageUrls[0]
          : '',
      address: apartment.address,
      size: apartment.size,
      rent: apartment.rent,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      furnished: apartment.furnished,
      parking: apartment.parking,
    });
  };

  const handleOpenModal = () => {
    setOpen(true);
    setEditMode(false);
    setEditData(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ color: 'gray' }}>My Apartment List</h2>

        <Button type="primary" onClick={handleOpenModal}>
          Add Apartment
        </Button>
      </div>
      <Modal
        title={editMode ? 'Edit Apartment' : 'Add Apartment'}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
          setEditMode(false);
          form.resetFields();
        }}
        width={800}
      >
        <Form
          form={form}
          // labelCol={{
          //   span: 3,
          // }}
          // wrapperCol={{
          //   span: 20,
          // }}
          style={{ marginTop: '2rem' }}
          name="register-form"
          // onFinish={editMode ? handleEditSubmit : handleSubmit}
          onFinish={(values) =>
            editMode ? handleEditSubmit(values) : handleSubmit(values)
          }
          autoComplete="off"
          layout="vertical"
        >
          <div
            style={{
              display: 'flex ',
              gap: '10px',
              // justifyContent: 'space-between',
            }}
          >
            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: 'Please select the type',
                },
              ]}
            >
              <Select
                size="large"
                value={'Select Type'}
                placeholder="Select Type"
                style={{ width: 180 }}
              >
                <Option value="Room">Room</Option>
                <Option value="House/Flat">House / Flat</Option>
                <Option value="Hostel">Hostel</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please input the title',
                },
              ]}
            >
              <Input size="large" placeholder="Title" />
            </Form.Item>
          </div>
          <Form.Item
            name="imageUrl"
            label="Image Link"
            rules={[
              {
                required: true,
                message: 'Please input the Image Link',
              },
            ]}
          >
            <Input size="large" placeholder="Image URL" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please input the address',
              },
            ]}
          >
            <Input size="large" placeholder="Address" />
          </Form.Item>
          <div
            style={{
              display: 'flex ',
              gap: '10px',
              justifyContent: 'space-between',
            }}
          >
            <Form.Item
              name="size"
              label="Size"
              rules={[
                {
                  required: true,
                  message: 'Please input the size',
                },
              ]}
            >
              <Input size="large" placeholder="Size" />
            </Form.Item>
            <Form.Item
              name="rent"
              label="Rent"
              rules={[
                {
                  required: true,
                  message: 'Please input the size',
                },
              ]}
            >
              <Input size="large" placeholder="Rent" />
            </Form.Item>

            <Form.Item
              name="bedrooms"
              label="Bedrooms"
              rules={[
                {
                  required: true,
                  message: 'Please input the number of bedrooms',
                },
              ]}
            >
              <Input size="large" placeholder="Bedrooms" />
            </Form.Item>
            <Form.Item
              name="bathrooms"
              label="Bathrooms"
              rules={[
                {
                  required: true,
                  message: 'Please input the number of bathrooms',
                },
              ]}
            >
              <Input size="large" placeholder="Bathrooms" />
            </Form.Item>
          </div>
          <div
            style={{
              display: 'flex ',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <Form.Item
              name="furnished"
              label="Furnished?"
              valuePropName="checked"
            >
              <Checkbox size="large" />
            </Form.Item>
            <Form.Item name="parking" label="Parking?" valuePropName="checked">
              <Checkbox size="large" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        {loading ? (
          <p>Loading apartments...</p>
        ) : (
          <ApartmentList
            apartments={apartments}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default AddApartment;

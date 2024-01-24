import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  message,
  Progress,
  Flex,
} from 'antd';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { ApartmentContext } from '../../contexts/ApartContext';
import ApartmentList from '../apartmentList/ApartmentList';
import ProfileProgress from '../profileProgress/ProfileProgress';
import getProfileProgress from '../../utils/getProfileProgress';
import './addApartnent.css';

const { Option } = Select;

const AddApartment = () => {
  const { profileProgress } = getProfileProgress();
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

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageEdited, setImageEdited] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageEdited(true);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    try {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(2));
        },
        (error) => {
          console.error('Error uploading image:', error.message);
          message.error('Could not upload image (File must be less than 2MB)');
          setUploadProgress(0);
          setImageFile(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setUploadProgress(100);
          setImageFile(null);
        },
      );
    } catch (error) {
      console.error('Error uploading image:', error.message);
      message.error(error.message);
      setUploadProgress(0);
      setImageFile(null);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
    }

    if (!open || !editMode) {
      form.resetFields();
    }
  }, [open, editMode, error]);

  const handleSuccess = () => {
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
      values.imageUrl = imageFileUrl;
      values.usps = values.usps.split(',').map((item) => item.trim());
      addApartment(values);
      handleSuccess();
    } catch (error) {
      console.error('Error adding apartment:', error);
    }
  };

  const handleEditSubmit = (values) => {
    try {
      if (editData) {
        if (!imageEdited) {
          // If image is not edited, use the previous URL
          values.imageUrl = editData.imageUrl;
        } else {
          values.imageUrl = imageFileUrl;
        }
        if (Array.isArray(values.usps)) {
          values.usps = values.usps.map((item) => item.trim());
        } else {
          values.usps = values.usps.split(',').map((item) => item.trim());
        }
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
      message.success('Appartment Deleted Successfully');
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
      genderType: apartment.genderType,
      address: apartment.address,
      usps: apartment.usps,
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

  return (
    <>
      {profileProgress !== null && profileProgress < 100 ? (
        <ProfileProgress />
      ) : (
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
              style={{ marginTop: '2rem' }}
              name="register-form"
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
                  name="genderType"
                  label="Gender Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please select the gender type',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    value={'Select Gender Type'}
                    placeholder="Select Gender Type"
                    style={{ width: 180 }}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
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
              <Flex gap="large" align="center">
                <Form.Item
                  name="imageFile"
                  label="Upload Image"
                  rules={[
                    {
                      required: !editMode,
                      message: 'Please upload an image',
                    },
                  ]}
                >
                  <input
                    className="upload-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Item>

                {imageFile && (
                  <div style={{ flex: 1, padding: '0 10px' }}>
                    <Progress
                      percent={uploadProgress}
                      status={uploadProgress === 100 ? 'success' : 'active'}
                    />
                    <Button
                      type="default"
                      onClick={() => {
                        setUploadProgress(0);
                        setImageFile(null);
                      }}
                      style={{ marginTop: '8px' }}
                    >
                      Cancel Upload
                    </Button>
                  </div>
                )}
              </Flex>

              {/* <Flex gap="large"> */}
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
              {/* </Flex> */}
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
              <Flex gap="large">
                <Form.Item
                  name="usps"
                  label="Amenities"
                  style={{ width: '60%' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Amenities',
                    },
                  ]}
                >
                  <Input.TextArea
                    size="large"
                    placeholder="Amenities (comma-separated)"
                  />
                </Form.Item>
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
                  <Form.Item
                    name="parking"
                    label="Parking?"
                    valuePropName="checked"
                  >
                    <Checkbox size="large" />
                  </Form.Item>
                </div>
              </Flex>
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
      )}
    </>
  );
};

export default AddApartment;

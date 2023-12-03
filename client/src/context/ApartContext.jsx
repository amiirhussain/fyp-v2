import React, { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

const ApartmentContext = createContext({
  apartments: [],
  loading: true,
  fetchUserApartments: () => {},
  addApartment: () => {},
  updateApartment: () => {},
  deleteApartment: () => {},
});

const ApartmentProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserApartments();
  }, []);

  const fetchUserApartments = async () => {
    setLoading(true);
    // Replace with your actual API call and data parsing
    const response = await fetch('http://localhost:1337/apartment/by-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      setError(new Error('Error fetching user apartments'));
      setLoading(false);
      return;
    }

    const data = await response.json();
    setApartments(data);
    setLoading(false);
  };

  const addApartment = async (values) => {
    setLoading(true);
    // Replace with your actual API call and error handling
    const response = await fetch('http://localhost:1337/apartment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setError(new Error('Error creating apartment'));
      setLoading(false);
      return;
    }

    const data = await response.json();
    setApartments([...apartments, data]);
    setLoading(false);
    // message.success('Apartment added successfully');
  };

  const updateApartment = async (apartmentId, values) => {
    setLoading(true);
    // Replace with your actual API call and error handling
    const response = await fetch(
      `http://localhost:1337/apartment/${apartmentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(values),
      },
    );

    if (!response.ok) {
      setError(new Error('Error updating apartment'));
      setLoading(false);
      return;
    }

    const data = await response.json();
    const updatedApartments = apartments.map((apartment) =>
      apartment._id === apartmentId ? data : apartment,
    );
    setApartments(updatedApartments);
    setLoading(false);
    // message.success('Apartment updated successfully');
  };

  const deleteApartment = async (apartmentId) => {
    setLoading(true);
    // Replace with your actual API call and error handling
    const response = await fetch(
      `http://localhost:1337/apartment/${apartmentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      },
    );

    if (!response.ok) {
      setError(new Error('Error deleting apartment'));
      setLoading(false);
      return;
    }

    setApartments(
      apartments.filter((apartment) => apartment._id !== apartmentId),
    );
    setLoading(false);
    // message.success('Apartment deleted successfully');
  };

  return (
    <ApartmentContext.Provider
      value={{
        apartments,
        loading,
        error,
        fetchUserApartments,
        addApartment,
        updateApartment,
        deleteApartment,
      }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};

export { ApartmentProvider, ApartmentContext };

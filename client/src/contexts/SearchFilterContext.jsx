import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router';

const SearchFilterContext = createContext();

export const useSearchFilterContext = () => {
  return useContext(SearchFilterContext);
};

export const SearchFilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [isNoApartmentsFound, setIsNoApartmentsFound] = useState(false);

  const handleSearch = async (form) => {
    try {
      const values = await form.validateFields();
      const { type, location } = values;

      const response = await fetch(
        `http://localhost:1337/apartment/filter-apartments/?type=${type}&location=${location}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApartments(data);
      setIsNoApartmentsFound(data.length === 0);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  return (
    <SearchFilterContext.Provider
      value={{ apartments, isNoApartmentsFound, handleSearch }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

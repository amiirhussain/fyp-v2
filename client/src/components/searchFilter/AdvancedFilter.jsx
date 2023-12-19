import React, { useEffect, useState } from 'react';
import { useSearchFilterContext } from '../../contexts/SearchFilterContext';
import FilterList from './FilterList';
import {
  Card,
  InputNumber,
  Checkbox,
  Flex,
  Skeleton,
  Slider,
  Empty,
} from 'antd';

// ... (previous imports)

const AdvancedFilter = () => {
  const { apartments, isNoApartmentsFound } = useSearchFilterContext();
  const [loading, setLoading] = useState(true);
  const [filteredApartments, setFilteredApartments] = useState(apartments);

  const [filters, setFilters] = useState({
    minRent: null,
    maxRent: null,
    minSize: null,
    maxSize: null,
    bedrooms: null,
    furnished: false,
    parking: false,
  });

  // Function to handle filter changes
  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  // Function to filter apartments based on current filters
  const filterApartments = () => {
    const filtered = apartments.filter((apartment) => {
      return (
        (filters.minRent === null || apartment.rent >= filters.minRent) &&
        (filters.maxRent === null || apartment.rent <= filters.maxRent) &&
        (filters.minSize === null || apartment.size >= filters.minSize) &&
        (filters.maxSize === null || apartment.size <= filters.maxSize) &&
        (filters.bedrooms === null ||
          apartment.bedrooms === filters.bedrooms) &&
        (!filters.furnished || apartment.furnished) &&
        (!filters.parking || apartment.parking)
      );
    });

    setFilteredApartments(filtered);
  };

  // Call the filter function whenever filters change
  useEffect(() => {
    filterApartments();
  }, [filters, apartments]);

  useEffect(() => {
    if (apartments.length > 0) {
      setLoading(false);
    }
  }, [apartments]);

  return (
    <div style={{ width: '100%' }}>
      <Flex gap="large">
        {/* advanced filter */}
        <Card title="Search Filter" style={{ flex: 1 }}>
          <Flex vertical="column" gap="large">
            <Flex gap="small">
              <label>Rent Range:</label>
              <InputNumber
                placeholder="Min"
                onChange={(value) => handleFilterChange('minRent', value)}
              />
              <InputNumber
                placeholder="Max"
                onChange={(value) => handleFilterChange('maxRent', value)}
              />
            </Flex>
            <Flex gap="small">
              <label>Size Range:</label>
              <InputNumber
                placeholder="Min"
                onChange={(value) => handleFilterChange('minSize', value)}
              />
              <InputNumber
                placeholder="Max"
                onChange={(value) => handleFilterChange('maxSize', value)}
              />
            </Flex>
            <Flex gap="small">
              <label>Bedrooms:</label>
              <InputNumber
                placeholder="Eg: 1, 2, 3"
                onChange={(value) => handleFilterChange('bedrooms', value)}
              />
            </Flex>
            <Flex gap="small">
              <label>Furnished:</label>
              <Checkbox
                onChange={(e) =>
                  handleFilterChange('furnished', e.target.checked)
                }
              />
            </Flex>
            <Flex gap="small">
              <label>Parking:</label>
              <Checkbox
                onChange={(e) =>
                  handleFilterChange('parking', e.target.checked)
                }
              />
            </Flex>
          </Flex>
        </Card>

        {/* filtered list */}
        <Card style={{ flex: 2 }}>
          {isNoApartmentsFound ? (
            <Empty description="No Apartments Found" />
          ) : loading ? (
            <Skeleton active />
          ) : (
            <>
              {filteredApartments.length > 0 && (
                <FilterList filteredApartments={filteredApartments} />
              )}
            </>
          )}
        </Card>
      </Flex>
    </div>
  );
};

export default AdvancedFilter;

import React, { useEffect, useState } from 'react';
import { useSearchFilterContext } from '../../contexts/SearchFilterContext';
import FilterList from './FilterList';
import { Card, InputNumber, Checkbox, Flex, Empty, Select, Form } from 'antd';

const { Option } = Select;

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
    genderType: null,
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
        (filters.genderType === null ||
          apartment.genderType === filters.genderType) &&
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
        <Card title="Search Filter" style={{ width: '350px' }}>
          <Form layout="vertical">
            <Form.Item label="Gender Type:">
              <Select
                placeholder="Select gender"
                onChange={(value) => handleFilterChange('genderType', value)}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Rent Range:">
              <Flex gap="large" align="center">
                <InputNumber
                  placeholder="Min"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('minRent', value)}
                />
                <span>to</span>
                <InputNumber
                  placeholder="Max"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('maxRent', value)}
                />
              </Flex>
            </Form.Item>
            <Form.Item label="Size Range:">
              <Flex gap="large" align="center">
                <InputNumber
                  placeholder="Min"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('minSize', value)}
                />
                <span>to</span>
                <InputNumber
                  placeholder="Max"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('maxSize', value)}
                />
              </Flex>
            </Form.Item>

            <Form.Item label="Bedrooms:">
              <InputNumber
                placeholder="Eg: 1, 2, 3 . . ."
                style={{ width: '100%' }}
                onChange={(value) => handleFilterChange('bedrooms', value)}
              />
            </Form.Item>

            <Flex gap="large">
              <Form.Item label="Furnished">
                <Checkbox
                  onChange={(e) =>
                    handleFilterChange('furnished', e.target.checked)
                  }
                />
              </Form.Item>

              <Form.Item label="Parking">
                <Checkbox
                  onChange={(e) =>
                    handleFilterChange('parking', e.target.checked)
                  }
                />
              </Form.Item>
            </Flex>
          </Form>
        </Card>

        {/* filtered list */}
        <Card style={{ flex: 1 }}>
          {isNoApartmentsFound ? (
            <Empty description="No Apartments Found" />
          ) : loading ? (
            <Empty description="Apartments List" />
          ) : (
            <>
              {filteredApartments.length > 0 ? (
                <FilterList filteredApartments={filteredApartments} />
              ) : (
                <Empty description="No Apartments Found" />
              )}
            </>
          )}
        </Card>
      </Flex>
    </div>
  );
};

export default AdvancedFilter;

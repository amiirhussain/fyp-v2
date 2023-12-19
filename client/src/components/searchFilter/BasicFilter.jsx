import { Button, Card, Flex, Form, Select } from 'antd';
import { useSearchFilterContext } from '../../contexts/SearchFilterContext';

const BasicFilter = () => {
  const { handleSearch } = useSearchFilterContext();
  const [form] = Form.useForm();

  return (
    <Card title="Search Apartment">
      <Form form={form} className="search--filter--form">
        <Form.Item name="type" className="search-form-input">
          <Select
            size="large"
            placeholder="Property Type"
            options={[
              { value: 'hostel', label: 'Hostel' },
              { value: 'room', label: 'Room' },
              { value: 'house/flat', label: 'House/Flat' },
            ]}
          />
        </Form.Item>
        <Form.Item name="location" className="search-form-input">
          <Select
            size="large"
            placeholder="Location"
            options={[
              { value: 'islamabad', label: 'Islamabad' },
              { value: 'rawalpindi', label: 'Rawalpindi' },
            ]}
          />
        </Form.Item>
        <Form.Item className="search-form-button">
          <Button
            type="primary"
            size="large"
            onClick={() => handleSearch(form)}
          >
            Search
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BasicFilter;

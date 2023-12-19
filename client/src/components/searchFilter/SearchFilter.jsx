import Navbar from '../header/Header';
import BasicFilter from './BasicFilter';
import { Card } from 'antd';
import './search.css';
import AdvancedFilter from './AdvancedFilter';

const SearchFilter = () => {
  return (
    <>
      <Navbar />
      <section className="search--filter">
        <BasicFilter />
        <AdvancedFilter />
      </section>
    </>
  );
};

export default SearchFilter;

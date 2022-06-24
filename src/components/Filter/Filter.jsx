import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={s.filterContainer}>
      <h4 className={s.title}>Find contacts by name</h4>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

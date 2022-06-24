import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact';
import s from './ContactList.module.css';

const ContactList = ({ list, onDeleteClick }) => {
  return (
    <ul className={s.listContainer}>
      {list.map(({ name, number, id }) => (
        <Contact
          key={name}
          name={name}
          number={number}
          deleteClick={() => onDeleteClick(id, name)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteClick: PropTypes.func.isRequired,
};

export default ContactList;

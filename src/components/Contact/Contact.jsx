import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact.module.css';

const Contact = ({ name, number, deleteClick }) => {
  return (
    <li className={s.contact}>
      <p className={s.text}>
        {name}: {number}
      </p>
      <button className={s.button} type="button" onClick={deleteClick}></button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteClick: PropTypes.func.isRequired,
};

export default Contact;

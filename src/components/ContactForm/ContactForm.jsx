import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = event => {
    const { value, name } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.checkForExistContact(contact.name)) {
      Notify.warning(`${name} is already in contacts`);
    } else {
      this.props.onSubmit(contact);
      this.reset();
    }
  };

  checkForExistContact = addNameContact => {
    const normalizedNameContact = addNameContact.toLowerCase();

    return this.props.contacts.some(
      name => name.toLowerCase() === normalizedNameContact
    );
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </label>

        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string.isRequired),
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

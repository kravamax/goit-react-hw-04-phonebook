import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import contactsData from './contacts.json';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Container from './Container';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageData = localStorage.getItem('contacts');
    const parsedstorageData = JSON.parse(storageData);

    if (!parsedstorageData) {
      this.setState({ contacts: contactsData });
    } else {
      this.setState({ contacts: parsedstorageData });
    }
  }

  componentDidUpdate(prevProps, prevstate) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevstate.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));

    Notify.success(`${contact.name} added to contacts!`);
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  filterByName = () => {
    const { contacts, filter } = this.state;
    const normilizeFilter = filter.toLocaleLowerCase();

    const filteredData = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normilizeFilter)
    );

    return filteredData;
  };

  deleteContact = (idContact, name) => {
    Notify.info(`${name} was deleted from contacts!`);

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  getNamesListOfContacts = () => {
    const { contacts } = this.state;
    return contacts.map(({ name }) => name);
  };

  render() {
    return (
      <div>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm
            contacts={this.getNamesListOfContacts()}
            onSubmit={this.addContact}
          />

          <h2>Contacts</h2>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            list={this.filterByName()}
            onDeleteClick={this.deleteContact}
          />
        </Container>
      </div>
    );
  }
}

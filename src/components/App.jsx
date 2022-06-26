import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import contactsData from './contacts.json';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Container from './Container';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storageData = localStorage.getItem('contacts');
    const parsedstorageData = JSON.parse(storageData);

    parsedstorageData.length === 0
      ? setContacts(contactsData)
      : setContacts(parsedstorageData);
  }, []);

  useEffect(
    () => localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );

  const addContact = contact => {
    setContacts([...contacts, contact]);
    Notify.success(`${contact.name} added to contacts!`);
  };

  const changeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const filterByName = () => {
    const normilizeFilter = filter.toLocaleLowerCase();
    const filteredData = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normilizeFilter)
    );
    return filteredData;
  };

  const deleteContact = (idContact, name) => {
    Notify.info(`${name} was deleted from contacts!`);
    setContacts(contacts.filter(contact => contact.id !== idContact));
  };

  const getNamesListOfContacts = () => {
    return contacts.map(({ name }) => name);
  };

  return (
    <div>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={getNamesListOfContacts()}
          onSubmit={addContact}
        />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList list={filterByName()} onDeleteClick={deleteContact} />
      </Container>
    </div>
  );
};

export default App;

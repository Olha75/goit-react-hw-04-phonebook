import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('contacts'));
    return data || [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = ({ name }) => {
    const normalizedName = name.toLowerCase();

    return contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  const addContact = data => {
    if (isDuplicate(data)) {
      return alert('Цей контакт вже їснує!');
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div className="blockPhonebook">
        <h1 className="titlePhonebook">Phonebook</h1>
        <div>
          <ContactForm onSubmit={addContact} />
        </div>
        <h2 className="titleContacts">Contacts</h2>
        <div className="formContacts">
          <Filter filter={filter} changeFilter={changeFilter} />
          {contacts.length > 0 || filter ? (
            <ContactList
              items={filteredContacts}
              deleteContact={deleteContact}
            />
          ) : (
            <p className="pMessage">No contacts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

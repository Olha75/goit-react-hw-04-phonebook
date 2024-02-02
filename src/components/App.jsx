import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  isDuplicate = ({ name }) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    return contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  addContact = data => {
    if (this.isDuplicate(data)) {
      return alert('Contact is already in the list');
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...data }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  };

  render() {
    const { addContact, deleteContact, changeFilter } = this;
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

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
  }
}

export default App;

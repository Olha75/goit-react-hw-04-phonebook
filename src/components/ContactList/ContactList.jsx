import React from 'react';
import ContactItem from './ContactItem/ContactItem';
import css from './contactList.module.css';

const ContactList = ({ items, deleteContact }) => (
  <>
    <ol className={css.allContact}>
      {items.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ol>
  </>
);

export default ContactList;

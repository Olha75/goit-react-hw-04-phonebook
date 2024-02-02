import css from './contactItem.module.css';
import React from 'react';

const ContactItem = ({ id, name, number, deleteContact }) => (
  <li className={css.contactsItem} key={id}>
    {name} {number}
    <button
      className={css.btnItem}
      onClick={() => deleteContact(id)}
      type="button"
    >
      X
    </button>
  </li>
);

export default ContactItem;

import { Component } from 'react';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

const INITIAL_STATE = { name: '', number: '' };

class ContactForm extends Component {
  nameId = nanoid();
  telId = nanoid();

  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'number') {
      const numericValue = value.replace(/\D/g, '');
      if (value !== numericValue) {
        alert('Введіть тільки цифри');
        return;
      }
      this.setState({
        [name]: numericValue,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { nameId, telId, handleSubmit, handleChange } = this;
    const { name, number } = this.state;

    return (
      <form className={css.forma} onSubmit={handleSubmit}>
        <div>
          <label className={css.labelForm} htmlFor={nameId}>
            Name
          </label>
          <input
            className={css.inpForm}
            value={name}
            onChange={handleChange}
            id={nameId}
            type="text"
            name="name"
            required
            placeholder="Введіть ім'я"
          />
          <label className={css.labelForm} htmlFor={telId}>
            Number
          </label>
          <input
            className={css.inpForm}
            value={number}
            onChange={handleChange}
            id={telId}
            type="tel"
            name="number"
            required
            placeholder="Введіть номер телефона"
          />
          <button className={css.btnForm} type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;

import css from './filter.module.css';

const Filter = ({ filter, changeFilter }) => {
  return (
    <div className={css.conteinerFiltr}>
      <label className={css.labelForm} htmlFor="filter">
        Find contacts by name
        <input
          className={css.inpFiltr}
          onChange={changeFilter}
          value={filter}
          name="filter"
          placeholder="Введіть ім'я або номер"
        />
      </label>
    </div>
  );
};

export default Filter;

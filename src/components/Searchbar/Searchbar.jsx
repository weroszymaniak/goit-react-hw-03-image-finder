import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  onSearch = e => {
    e.prevent.default();
    this.props.getInputValue(this.state.input);
    this.setState({ input: '' });
    console.log('event search');
  };

  onChange = e => {
    this.setState({ input: e.target.value });
    console.log('event change');
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.onSearch} className={css.form}>
          <button type="submit" className={css.button}>
            <span>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            id="search"
            value={this.state.input}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

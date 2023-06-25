import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
    // search: '',
  };
  onChange = e => {
    this.setState({ inputValue: e.target.value });

    console.log('event change');
  };
  handleSubmit = e => {
    const { inputValue } = this.state;
    e.preventDefault();
    const query = inputValue;
    this.props.onSubmit(query);
    e.target.reset();
    console.log(query, 'query');
    // if (!this.state.search.trim()) {
    //   return;
    // }
    // this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            id="search"
            value={this.state.inputValue}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

import React from 'react';
import Header from '../components/Header';

const DOIS = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      buttonDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    if (value.length >= DOIS) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              value={ search }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

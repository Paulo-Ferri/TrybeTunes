import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../CSS/Search.css';

const DOIS = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      buttonDisabled: true,
      carregando: false,
      albuns: [],
      artista: '',
      searched: false,
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

  reqAlbuns = async () => {
    const { search } = this.state;
    const artista = search;
    this.setState({
      carregando: true,
    });
    const albunsRequisitados = await searchAlbumsAPI(artista);
    return this.setState({
      search: '',
      albuns: albunsRequisitados,
      carregando: false,
      artista,
      searched: true,
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.reqAlbuns();
  };

  onKeyUp = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      this.reqAlbuns();
    }
  }

  render() {
    const { search, buttonDisabled, albuns, carregando, artista, searched } = this.state;
    return (
      <div data-testid="page-search" className="div_search">
        <form className="form_search">
          <label htmlFor="search" className="label_search">
            <input
              data-testid="search-artist-input"
              className="input_search"
              type="text"
              name="search"
              placeholder="Search for a band or artist"
              value={ search }
              onChange={ this.onInputChange }
              onKeyPress={(e) => this.onKeyUp(e)}
            />
            <button
              className="search_page_btn"
              data-testid="search-artist-button"
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.handleClick }
            >
              Search
            </button>
          </label>
        </form>
        <div className="results_search">
          { carregando && <Loading /> }
          { searched && (
            <p className="results_text">
              Showing results for:
              {` ${artista}`}
            </p>
          )}
          <div className="albuns_container">
            {
              albuns.length > 0
                ? albuns.map((album) => (
                  <Link
                    to={ `/album/${album.collectionId}` }
                    album={ album }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    key={ album.collectionId }
                    className="album_link"
                  >
                    <div className="results_items" key={ album.collectionId }>
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <p>{ album.collectionName }</p>
                    </div>
                  </Link>
                )) : searched && (<p>Nenhum álbum foi encontrado</p>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

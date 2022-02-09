import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.reqAlbuns();
  }

  render() {
    const { search, buttonDisabled, albuns, carregando, artista } = this.state;
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        { carregando ? <Loading /> : (
          <p>
            Resultado de álbuns de:
            {` ${artista}`}
          </p>
        )}
        {
          albuns.length > 0
            ? albuns.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                { album.collectionName }
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              </Link>
            )) : <p>Nenhum álbum foi encontrado</p>
        }
      </div>
    );
  }
}

export default Search;

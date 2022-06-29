import React from 'react';
import Player from '../components/Player';
import '../CSS/Favorites.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      favoritedSongs: [],
    };
  }

  componentDidMount = async () => {
    this.setState({
      carregando: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      carregando: false,
      favoritedSongs: favorites,
    });
  }

  checkFavoriteCondition = () => {
    const { favoritedSongs } = this.state;
    console.log(favoritedSongs)
    if (!favoritedSongs.length) {
      return (
        <p> You don't have any favorite song yet. </p>
      );
    }

    return (
      <div className="favorite_songs">
          {favoritedSongs.map((favorite) => {
            return (
              <div className="favorite_card">
                <img src={favorite.artworkUrl100} alt="album image for favorite song" />
                <h1>{favorite.trackName}</h1>
                <h2>{favorite.artistName}</h2>
                <Player 
                  music={favorite}
                />
              </div>
            )})
          }
      </div>
    );
  }

  render() {
    const { carregando } = this.state;
    return (
        <div className="favorites_container">
          { carregando ? <div className="loading_favorites"><Loading /></div>
            : this.checkFavoriteCondition()}
        </div>
    );
  }
}

export default Favorites;

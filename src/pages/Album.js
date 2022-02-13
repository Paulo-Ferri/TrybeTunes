import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicsFromAlbum = await getMusics(id);
    const onlyMusics = musicsFromAlbum.filter((music) => music.kind === 'song');
    this.setState({
      artistName: musicsFromAlbum[0].artistName,
      albumName: musicsFromAlbum[0].collectionName,
      musics: onlyMusics,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorites,
    });
  }

  render() {
    const { artistName, albumName, musics, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>
        {musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            favorite={ favoriteSongs
              .some(() => favoriteSongs
                .find((song) => song.trackId === music.trackId)) }
          />
        ))}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
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
  }

  render() {
    const { artistName, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>
        {musics.map((music) => (
          <MusicCard key={ music.trackId } music={ music } />
        ))}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import '../CSS/Album.css';
import Player from '../components/Player'
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      albumAttributes: {},
      carregando: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      carregando: true,
    });
    const musicsFromAlbum = await getMusics(id);
    const onlyMusics = musicsFromAlbum.filter((music) => music.kind === 'song');
    this.setState({
      musics: onlyMusics,
      albumAttributes: musicsFromAlbum[0],
      carregando: false,
    });
  }

  render() {
    const { musics, albumAttributes, carregando } = this.state;
    return (
      <div className="page_album">
        {carregando ? <Loading /> : (
          <>
          <div className="album_details">
            <img src={albumAttributes.artworkUrl100}/>
          </div>
          <div className="album_songs_container">
            <h1>{musics.length && musics[0].collectionName}</h1>
            <h2>{musics.length && musics[0].artistName}</h2>
            {musics.map((music) => 
              <div className="album_music_container" key={music.trackId}>
                <p>{music.trackName}</p>
                <Player music={music}/>
              </div>
            )}
          </div>
          </>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

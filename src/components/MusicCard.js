import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
    };
  }

   onChecked = async (music) => {
     this.setState({
       carregando: true,
     });
     await addSong(music);
     this.setState({
       carregando: false,
     });
   };

   render() {
     const { music } = this.props;
     const { carregando } = this.state;
     return (
       <div>
         <p>{ music.trackName }</p>
         <audio data-testid="audio-component" src={ music.previewUrl } controls>
           <track kind="captions" />
           O seu navegador não suporta o elemento
           {' '}
           <code>audio</code>
           .
         </audio>
         <label
           htmlFor="favorito"
         >
           <input
             type="checkbox"
             data-testid={ `checkbox-music-${music.trackId}` }
             id="favorito"
             onChange={ () => this.onChecked(music) }
           />
         </label>
         {carregando && <Loading />}
       </div>
     );
   }
}

MusicCard.propTypes = {
  music: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      favorited: false,
    };
  }

   onChecked = async (music) => {
     this.setState({
       carregando: true,
     });
     await addSong(music);
     this.setState({
       carregando: false,
       favorited: true,
     });
   };

   render() {
     const { music, favorite } = this.props;
     const { carregando, favorited } = this.state;
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
             id={ music.trackId }
             onClick={ () => this.onChecked(music) }
             checked={ favorite ? true : favorited }
           />
         </label>
         {carregando && <Loading />}
       </div>
     );
   }
}

MusicCard.propTypes = {
  music: PropTypes.instanceOf(Object).isRequired,
  favorite: PropTypes.string.isRequired,
};

export default MusicCard;

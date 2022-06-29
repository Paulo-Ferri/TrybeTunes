import React, { useState, useRef, useEffect } from 'react';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import '../CSS/Player.css';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillHeartFill, BsHeart } from 'react-icons/bs'
import loading_gif from '../img/loading_gif.gif'

const Player = ({ music } ) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();


  useEffect(() => {
    const getFavorites = async () => {
      const favorites = await getFavoriteSongs();
      console.log(favorites);
      const favorited = favorites.find((song) => song.trackId === music.trackId);
      if (favorited) {
        setIsFavorite(true);
      }
    }
    getFavorites();
    setIsLoading(false);
  }, []);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes} : ${returnedSeconds}`;
  }

  const onChecked = async (music) => {
    setIsLoading(true);
    await addSong(music);
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      removeSong(music);
    }
    setIsLoading(false);
  };

  const onLoadedMetaData = () => {
    setDuration(Math.floor(audioPlayer.current?.duration));
    progressBar.current.max = Math.floor(audioPlayer.current?.duration);
  };

  const setPlayCondition = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue)
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value/ duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }
  
  return (
    <div className="custom_player">
      <audio ref={audioPlayer} src={ music.previewUrl } onLoadedMetadata={onLoadedMetaData}/>
      <button
        onClick={ setPlayCondition }
        className="play_pause_button"
      >
        {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill /> }
      </button>
      <div className="current_time">{calculateTime(currentTime)}</div>
      <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} step='0.05'/>
      <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      <button
        type="checkbox"
        id={ music.trackId }
        onClick={ () => onChecked(music) }
        checked={ isFavorite ? true : isFavorite }
      >
        { isLoading ? <img className="loadingFavorite" src={loading_gif} alt="loading gif" /> 
        : isFavorite ? <BsFillHeartFill/> : <BsHeart />}
      </button>
    </div>
  );
  }

export default Player;

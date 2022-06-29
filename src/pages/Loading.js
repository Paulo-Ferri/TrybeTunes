import React from 'react';
import duck from '../img/duck.gif'

class Loading extends React.Component {
  render() {
    return (
      <div>
          <img
            style={ { width: '5vw' } }
            src={duck} alt="loading gif"
          />
          <p style={ { color: '#f50555' } }>Loading...</p>
      </div>
    );
  }
}

export default Loading;

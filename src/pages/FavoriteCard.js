import React from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';

class FavoriteCard extends React.Component {
  state = {
    loading: false,
    checked: true,
  };

  //   componentDidMount() {
  //     const { savedFavorites, trackId } = this.props;

  //     savedFavorites.map((element) => {
  //       // if(index===1){
  //       if (element.trackId === trackId) {
  //         this.setState({ check: true });
  //       }
  //       return null;
  //       // }
  //     });
  //   }

  handleCheck = async (element) => {
    this.setState({ loading: true });
    await removeSong(element);
    this.setState({ loading: false, checked: false });
  };

  render() {
    const { element } = this.props;
    const { trackName, previewUrl, trackId } = element;
    const { loading, checked } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    if (!checked) {
      return <div />;
    }
    return (
      <li>
        <label htmlFor="favoriteCheck">
          Favorita
          <input
            id="favoriteCheck"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ () => {
              this.handleCheck(element);
            } }
            checked
          />
        </label>
        {trackName}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </li>
    );
  }
}

FavoriteCard.propTypes = {
  element: PropTypes.object,
}.isRequired;

export default FavoriteCard;

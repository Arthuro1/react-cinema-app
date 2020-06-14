import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { IMAGE_URL } from '../../../../../../services/movieService';

import './Media.scss';
import Grid from '../../../../grid/Grid';

const Media = (props) => {
  const { person, showMovies, showPhotos } = props;
  const [credits] = useState(person[1]);
  const [images] = useState(person[2]);

  return (
    <>
      <div className="media">
        {showMovies ? (
          <div>
            <div className="media-title">Other Films({credits.cast.length})</div>
            <Grid />
          </div>
        ) : showPhotos ? (
          <div>
            <div className="media-title">Photos ({images.profiles.length})</div>
            <div className="media-images">
              {images.profiles.map((image, i) => (
                <div
                  key={i}
                  className="image-cell"
                  style={{
                    backgroundImage: `url(${IMAGE_URL}${image.file_path})`
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

Media.propTypes = {
  person: PropTypes.array,
  showMovies: PropTypes.bool,
  showPhotos: PropTypes.bool
};

const mapStateToProps = (state) => ({
  person: state.movies.person
});

export default connect(mapStateToProps, {})(Media);

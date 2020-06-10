import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { IMAGE_URL } from '../../../services/movieService';
import './Grid.scss';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';

const Grid = (props) => {
  const { list } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieData.map((movie, i) => (
          <div key={uuidv4()}>
            <LazyImage className="grid-cell" src={`${IMAGE_URL}${movie.poster_path}`} alt="placeholder">
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">{movie.title}</span>
                <div className="grid-detail-rating">
                  <Rating rating={movie.vote_average} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">{movie.vote_average}</div>
                </div>
              </div>
            </LazyImage>
          </div>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array
};
const mapStateToProps = (state) => ({
  list: state.movies.list
});

export default connect(mapStateToProps, {})(Grid);

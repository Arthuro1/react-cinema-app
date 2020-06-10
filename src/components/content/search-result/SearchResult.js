import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { IMAGE_URL } from '../../../services/movieService';
import '../grid/Grid.scss';
import './SearchResult.scss';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';

const SearchResult = (props) => {
  const { searchResult, searchQuery } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((movie, i) => (
          <Fragment key={uuidv4()}>
            {movie.poster_path && (
              <LazyImage className="grid-cell" src={`${IMAGE_URL}${movie.poster_path}`} alt="placeholder">
                <div className="grid-read-more">
                  <button className="grid-cell-button">
                    <Link to={`/${movie.id}/${formatMovieTitle(movie.title)}/details`}>Read More</Link>
                  </button>
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
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  searchQuery: PropTypes.string,
  searchResult: PropTypes.array
};
const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  searchQuery: state.movies.searchQuery
});

export default connect(mapStateToProps, {})(SearchResult);

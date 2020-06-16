import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { IMAGE_URL } from '../../../services/movieService';
import './Grid.scss';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';

const Grid = (props) => {
  const { list, person, movie } = props;
  const [movieData, setMovieData] = useState([]);
  const { personId, id } = useParams();

  useEffect(() => {
    if (personId) {
      setMovieData(person[1].cast);
    } else if (id) {
      setMovieData(movie[5].results);
    } else {
      setMovieData(list);
    }
  }, [list, person, personId, movie, id]);

  const formatMovieTitle = (title) => {
    const titleStr = title.replace(/%/g, ' per cent').toLowerCase();
    const cleanedStr = titleStr.replace(/ /g, '-');

    return cleanedStr;
  };

  return (
    <>
      <div className="grid">
        {movieData.map((data, i) => (
          <div key={uuidv4()}>
            <LazyImage className="grid-cell" src={`${IMAGE_URL}${data.poster_path}`} alt="placeholder">
              <div className="grid-read-more">
                <button className="grid-cell-button">
                  <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>Read More</Link>
                </button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">{data.title}</span>
                <div className="grid-detail-rating">
                  <Rating rating={data.vote_average} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">{data.vote_average}</div>
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
  list: PropTypes.array,
  person: PropTypes.array,
  movie: PropTypes.array,
  getMovieDetails: PropTypes.func
};
const mapStateToProps = (state) => ({
  list: state.movies.list,
  person: state.movies.person,
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Grid);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';

import './Reviews.scss';

const Reviews = (props) => {
  const { movie } = props;
  const [reviews] = useState(movie[4]);

  return (
    <>
      <div className="movie-reviews">
        <div className="div-title">Reviews ({reviews.results.length > 0 ? reviews.results.length : 0})</div>
        {reviews.results.length ? (
          reviews.results.map((review, i) => (
            <div key={uuidv1()} className="reviews">
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews to show</p>
        )}
      </div>
    </>
  );
};

Reviews.propTypes = {
  movie: PropTypes.array
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Reviews);

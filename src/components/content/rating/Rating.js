import React, { useState, useEffect, Fragment, useRef } from 'react';
import Proptypes from 'prop-types';

import './Rating.scss';

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStars] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((i) => i + 1));
    let percentage;

    if (rating !== undefined && rating !== null) {
      percentage = (rating / 10) * 100;
    }

    const starPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = starPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberOfStars &&
          numberOfStars.map((i) => (
            <Fragment key={i}>
              <i className="fa fa-star" aria-hidden="true"></i>
            </Fragment>
          ))}
        <div className={`front-stars ${className}`} ref={ratingRef}>
          {numberOfStars &&
            numberOfStars.map((i) => (
              <Fragment key={i}>
                <i className="fa fa-star" aria-hidden="true"></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: Proptypes.number.isRequired,
  totalStars: Proptypes.number.isRequired,
  className: Proptypes.string
};

export default Rating;

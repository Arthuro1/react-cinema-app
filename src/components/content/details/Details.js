import React from 'react';
import Rating from '../rating/Rating';

import './Details.scss';
import Tabs from './tabs/Tabs';
import Overview from './overview/Overview';
import Crew from './crew/Crew';
import Media from './media/Media';
import Reviews from './reviews/Reviews';

const Details = () => {
  return (
    <>
      <div className="movie-container">
        <div className="movie-bg" style={{ backgroundImage: `url(${'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'})` }}></div>
        <div className="movie-overlay"></div>
        <div className="movie-details">
          <div className="movie-image">
            <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="found" />
          </div>
          <div className="movie-body">
            <div className="movie-overview">
              <div className="title">
                Avengers <span>2020/23/02</span>
              </div>
              <div className="movie-genres">
                <ul className="genres">
                  <li>Action</li>
                  <li>Comedy</li>
                  <li>Sci-fi</li>
                </ul>
              </div>
              <div className="rating">
                <Rating className="rating-stars" rating={6.5} totalStars={10} />
                &nbsp;
                <span>6.5</span> <p>(200) reviews</p>
              </div>
              <Tabs>
                <div label="Overview">
                  <Overview />
                </div>
                <div label="Crew">
                  <Crew />
                </div>
                <div label="Media">
                  <Media />
                </div>
                <div label="Reviews">
                  <Reviews />
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;

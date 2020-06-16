/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './PersonDetails.scss';
import Tabs from '../../tabs/Tabs';
import { personDetails } from '../../../../../redux/actions/movies';
import { pathUrl } from '../../../../../redux/actions/routes';
import { IMAGE_URL } from '../../../../../services/movieService';
import Spinner from '../../../../spinner/Spinner';
import Media from './media/Media';
import Rating from './rating/Rating';
import Crew from './crew/Crew';

const PersonDetails = (props) => {
  const { personDetails, person, pathUrl, match } = props;
  const { personId } = useParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    pathUrl(match.path, match.url);
    if (person.length === 0) {
      personDetails(personId);
    }
    setDetails(person[0]);
    // eslint-disable-next-line
  }, [personId, person]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        details && (
          <div className="movie-container">
            <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details.profile_path})` }}></div>
            <div className="movie-overlay"></div>
            <div className="movie-details">
              <div className="movie-image">
                <img src={`${IMAGE_URL}${details.profile_path}`} alt="" />
              </div>
              <div className="movie-body">
                <div className="movie-overview">
                  <div className="title">
                    {details.name} <span>{details.birthday}</span>
                  </div>
                  <div className="movie-genres">
                    <ul className="genres">{details.also_known_as && [...new Set(details.also_known_as)].slice(0, 6).map((name) => <li key={uuidv4()}>{name}</li>)}</ul>
                  </div>
                  <div className="rating">
                    <Rating className="rating-stars" rating={details.popularity} totalStars={10} />
                    &nbsp;
                    <span></span> <p>({details.popularity.toFixed(2)}%) popularity</p>
                  </div>
                  <Tabs>
                    <div label="Biography">{details.biography && details.biography.length ? details.biography : 'No Biography to show'}</div>
                    <div label="Place of birth">{details.place_of_birth && details.place_of_birth.length ? details.place_of_birth : 'No Place of birth to show'}</div>
                    <div label="Photos">
                      <Media showMovies={false} showPhotos={true} />
                    </div>
                    <div label="Also Played in">
                      <Media showMovies={true} showPhotos={false} />
                    </div>
                    <div label="Was crew member in">
                      <Crew />
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

PersonDetails.propTypes = {
  personDetails: PropTypes.func,
  person: PropTypes.array,
  pathUrl: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = (state) => ({
  person: state.movies.person
});

export default connect(mapStateToProps, { personDetails, pathUrl })(PersonDetails);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IMAGE_URL } from '../../../../services/movieService';
import { clearPersonDetails, clearMovieDetails } from '../../../../redux/actions/movies';
import './Crew.scss';

const Crew = (props) => {
  const { movie, clearPersonDetails, clearMovieDetails } = props;
  const [credits] = useState(movie[1]);
  const history = useHistory();

  const navigateToPersonDetails = (id) => {
    clearPersonDetails();
    clearMovieDetails();
    history.push(`/${id}/details`);
  };

  return (
    <>
      <div className="cast">
        <div className="div-title">Crew</div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th className="head">Department</th>
              <th className="head">Job</th>
            </tr>
          </thead>
          <tbody>
            {credits.crew.map((member) => (
              <tr key={member.credit_id}>
                <td>
                  <img src={`${IMAGE_URL}${member.profile_path}`} alt="" />
                </td>
                <td>
                  <div onClick={() => navigateToPersonDetails(`${member.id}`)}>{member.name}</div>
                </td>
                <td>{member.department}</td>
                <td>{member.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

Crew.propTypes = {
  movie: PropTypes.array,
  clearPersonDetails: PropTypes.func,
  clearMovieDetails: PropTypes.func
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, { clearMovieDetails, clearPersonDetails })(Crew);

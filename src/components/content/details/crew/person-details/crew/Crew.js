import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IMAGE_URL } from '../../../../../../services/movieService';
import { clearPersonDetails, clearMovieDetails } from '../../../../../../redux/actions/movies';
import './Crew.scss';

const Crew = (props) => {
  const { person, clearPersonDetails, clearMovieDetails } = props;
  const [credits] = useState(person[1]);
  const history = useHistory();

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  const navigateToMovieDetails = (id, title) => {
    clearPersonDetails();
    clearMovieDetails();
    history.push(`/${id}/${formatMovieTitle(title)}/details`);
  };

  return (
    <>
      <div className="cast">
        <div className="div-title">Films</div>
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
                  <img src={`${IMAGE_URL}${member.poster_path}`} alt="" />
                </td>
                <td>
                  <div onClick={() => navigateToMovieDetails(`${member.id}`, `${member.title}`)}>{member.title}</div>
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
  person: PropTypes.array,
  clearPersonDetails: PropTypes.func,
  clearMovieDetails: PropTypes.func
};

const mapStateToProps = (state) => ({
  person: state.movies.person
});

export default connect(mapStateToProps, { clearMovieDetails, clearPersonDetails })(Crew);

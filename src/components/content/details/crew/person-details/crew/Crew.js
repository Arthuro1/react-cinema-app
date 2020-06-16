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
            {credits.crew.map((data) => (
              <tr key={data.credit_id}>
                <td>
                  <img src={`${IMAGE_URL}${data.poster_path}`} alt="" />
                </td>
                <td>
                  <div onClick={() => navigateToMovieDetails(`${data.id}`, `${data.title}`)}>{data.title}</div>
                </td>
                <td>{data.department}</td>
                <td>{data.job}</td>
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

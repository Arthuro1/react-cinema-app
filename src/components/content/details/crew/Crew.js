import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { IMAGE_URL } from '../../../../services/movieService';

import './Crew.scss';

const Crew = (props) => {
  const { movie } = props;
  const [credits] = useState(movie[1]);

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
                <td>{member.name}</td>
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
  movie: PropTypes.array
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Crew);

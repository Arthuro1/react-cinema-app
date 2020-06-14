import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IMAGE_URL } from '../../../../services/movieService';
import { clearPersonDetails, clearMovieDetails } from '../../../../redux/actions/movies';
import './Overview.scss';

const Overview = (props) => {
  const { movie, clearPersonDetails, clearMovieDetails } = props;
  const [items, setItems] = useState([]);
  const [details] = useState(movie[0]);
  const [credits] = useState(movie[1]);
  const history = useHistory();
  useEffect(() => {
    const detailItems = [
      {
        id: 0,
        name: 'Tagline',
        value: `${details.tagline}`
      },
      {
        id: 1,
        name: 'Budget',
        value: `${numberFormatter(details.budget, 1)}`
      },
      {
        id: 2,
        name: 'Revenue',
        value: `${numberFormatter(details.revenue, 1)}`
      },
      {
        id: 3,
        name: 'Status',
        value: `${details.status}`
      },
      {
        id: 4,
        name: 'Release Date',
        value: `${details.release_date}`
      },
      {
        id: 5,
        name: 'Run Time',
        value: `${details.runtime}`
      }
    ];
    setItems(detailItems);

    // eslint-disable-next-line
  }, []);

  const navigateToPersonDetails = (id) => {
    clearPersonDetails();
    clearMovieDetails();
    history.push(`/${id}/details`);
  };

  const numberFormatter = (number, digits) => {
    const symbolArray = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' }
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let result = '';

    for (let i = 0; i < symbolArray.length; i++) {
      if (number >= symbolArray[i].value) {
        result = (number / symbolArray[i].value).toFixed(digits).replace(regex, '$1') + symbolArray[i].symbol;
      }
    }
    return result;
  };

  return (
    <div className="overview">
      <div className="overview-column-1">
        <div className="description">{details.overview}</div>

        <div className="cast">
          <div className="div-title">Cast</div>
          <table>
            <tbody>
              {credits.cast.map((actor) => (
                <tr key={actor.cast_id}>
                  <td>
                    <img src={`${IMAGE_URL}${actor.profile_path}`} alt="" />
                  </td>
                  <td>
                    <div onClick={() => navigateToPersonDetails(`${actor.id}`)}>{actor.name}</div>
                  </td>

                  <td>{actor.character}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="overview-column-2">
        <div className="overview-detail">
          <h6>Production Companies</h6>
          {details.production_companies.map((company) => (
            <div key={company.id} className="product-company">
              <img src={`${IMAGE_URL}${company.logo_path}`} alt="" />
              <span>{company.name}</span>
            </div>
          ))}
        </div>
        <div className="overview-detail">
          <h6>Language(s)</h6>
          <p>
            {details.spoken_languages.map((language, i) => (
              <a href="!#" key={i}>
                {language.name}
              </a>
            ))}
          </p>
        </div>
        {items.map((data) => (
          <div className="overview-detail" key={data.id}>
            <h6>{data.name}</h6>
            <p>
              <a href="!#">{data.value}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

Overview.propTypes = {
  movie: PropTypes.array,
  clearPersonDetails: PropTypes.func,
  clearMovieDetails: PropTypes.func
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, { clearPersonDetails, clearMovieDetails })(Overview);

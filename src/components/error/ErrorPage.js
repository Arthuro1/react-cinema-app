import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';

import './ErrorPage.scss';
import { setError } from '../../redux/actions/errors';

const ErrorPage = ({ clearState, setError, eventId }) => {
  const history = useHistory();

  const navigateToHomepage = () => {
    setError({ message: '', statusCode: null });
    clearState();
    history.push('/');
  };

  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <div id="outer">
        <div className="error-link" onClick={() => navigateToHomepage()}>
          <i className="fa fa-home" aria-hidden="true"></i> Go back to home page.
        </div>
        <div className="error-link" onClick={() => Sentry.showReportDialog({ eventId })}>
          <i className="fa fa-flag" aria-hidden="true"></i> Report feedback.
        </div>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  clearState: PropTypes.func,
  setError: PropTypes.func,
  eventId: PropTypes.any
};

export default connect(null, { setError })(ErrorPage);

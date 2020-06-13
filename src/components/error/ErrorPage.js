import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ErrorPage.scss';

const ErrorPage = ({ clearState }) => {
  const history = useHistory();

  const navigateToHomepage = () => {
    clearState();
    history.push('/');
  };

  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <div className="error-link" onClick={() => navigateToHomepage()}>
        <i className="icon-home"></i> Go back to home page.
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  clearState: PropTypes.func
};

export default ErrorPage;

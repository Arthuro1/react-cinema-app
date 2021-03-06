import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import MainContent from '../content/main-content/MainContent';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';
import './Main.scss';
import { pathUrl } from '../../redux/actions/routes';
import SearchResult from '../content/search-result/SearchResult';

function Main(props) {
  const { loadMoreMovies, setResponsePageNumber, page, totalPages, movieType, searchResult, match, pathUrl, errors } = props;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    pathUrl(match.path, match.url);
    setResponsePageNumber(currentPage, totalPages);
    // eslint-disable-next-line
  }, [currentPage, totalPages]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };

  return (
    <>
      {!errors.message && !errors.statusCode && (
        <div ref={mainRef} className="main" onScroll={() => handleScroll()}>
          {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}</>}
          <div ref={bottomLineRef}></div>
        </div>
      )}
    </>
  );
}

Main.propTypes = {
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  movieType: PropTypes.string,
  searchResult: PropTypes.array,
  match: PropTypes.object,
  pathUrl: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResult: state.movies.searchResult,
  errors: state.errors
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber, pathUrl })(Main);

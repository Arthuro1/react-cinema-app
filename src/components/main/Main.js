import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import MainContent from '../content/main-content/MainContent';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';
import './Main.scss';

function Main(props) {
  const { loadMoreMovies, setResponsePageNumber, page, totalPages, movieType } = props;
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
      <div ref={mainRef} className="main" onScroll={() => handleScroll()}>
        {loading ? <Spinner /> : <MainContent />}
        <div ref={bottomLineRef}></div>
      </div>
    </>
  );
}

Main.propTypes = {
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  movieType: PropTypes.string
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber })(Main);

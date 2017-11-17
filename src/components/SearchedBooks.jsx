import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import ErrorMessage from './common/ErrorMessage';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.object,
    activeSearchedBook: PropTypes.object,
    searchedBooks: PropTypes.arrayOf(PropTypes.object),
    totalSearched: PropTypes.number,
  }

  static defaultProps = {
    activeSearchedBook: {},
    searchedBooks: [{}],
    totalSearched: 0,
    modal: {},
  }

  render() {
    const { loading, modal, error, searchedBooks, totalSearched, activeSearchedBook } = this.props;
    return (
      <div className="searched-books__container">
        {loading && !modal && <Loading />}
        <Books books={searchedBooks} activeBook={activeSearchedBook} />
        {/* {!error && !modal && !loading && <Books books={searchedBooks} activeBook={activeSearchedBook} />} */}
        {error && !loading && <ErrorMessage
          classNames="error"
          icon="exclamation-circle"
          message="No Items Returned for your search. Please try again."
        />}
        {totalSearched > 40 && !modal && !loading && <FooterContainer />}
      </div>
    );
  }
}

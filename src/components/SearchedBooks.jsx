import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.object.isRequired,
    activeSearchedBook: PropTypes.object.isRequired,
    searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalSearched: PropTypes.number,
  }

  static defaultProps = {
    totalSearched: 0,
  }

  render() {
    const { searchedBooks, totalSearched, loading, modal, activeSearchedBook } = this.props;
    return (
      <div className="searched-books__container">
        {loading && !modal && <Loading />}
        <Books books={searchedBooks} activeBook={activeSearchedBook} />
        {totalSearched > 40 && <FooterContainer />}
      </div>
    );
  }
}

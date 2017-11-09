import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import BooksContainer from '../containers/BooksContainer';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    activeSearchedBook: PropTypes.object,
    searchedBooks: PropTypes.object,
  }

  static defaultProps = {
    searchedBooks: [{}],
    activeSearchedBook: {},
  }

  render() {
    const { searchedBooks, totalSearched, loading, modal } = this.props;
    return (
      <div className="searched-books__container">
        {loading && !modal && <Loading />}
        <BooksContainer showBooks={{ books: searchedBooks, library: false }} />
        {totalSearched > 40 && <FooterContainer />}
      </div>
    );
  }
}

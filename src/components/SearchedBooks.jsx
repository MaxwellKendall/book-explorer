import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BooksContainer from '../containers/BooksContainer';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    activeSearchedBook: PropTypes.object,
    searchedBooks: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    searchedBooks: [{}],
    activeSearchedBook: {},
  }

  state = {};

  render() {
    const { searchedBooks, activeSearchedBook } = this.props;
    return (
      <div className="searched-books__container">
        <BooksContainer showBooks={{ books: searchedBooks, library: false }} />
        {searchedBooks.totalSearched > 40 && <FooterContainer />}
      </div>
    );
  }
}

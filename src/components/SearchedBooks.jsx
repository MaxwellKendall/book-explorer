import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BooksContainer from '../containers/BooksContainer';
import BookGalleryContainer from '../containers/BookGalleryContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    activeSearchedBook: PropTypes.object.isRequired,
    searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalSearched: PropTypes.number.isRequired,
  }

  state = {};

  render() {
    const { searchedBooks, activeSearchedBook, totalSearched } = this.props;
    return (
      <div className="searched-books__container">
        <BooksContainer
          activeBook={activeSearchedBook}
          showBooks={searchedBooks}
          // TODO: Books needs to have all icons and their events; i.e. add/delete book
          // TODO: Books needs to show modal via action creator this.props.showModal(propsforModal)
        />
      </div>
    );
  }
}

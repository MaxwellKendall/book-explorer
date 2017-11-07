import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BooksContainer from '../containers/BooksContainer';
import BookGalleryContainer from '../containers/BookGalleryContainer';
import FooterContainer from '../containers/FooterContainer';

export default class Library extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeLibraryBook: PropTypes.object.isRequired,
  }

  state = {};

  render() {
    const { books, activeLibraryBook } = this.props;
    return (
      <div className="library-books__container">
        {books &&
          <BookGalleryContainer books={books} activeBook={activeLibraryBook}>
            <BooksContainer />
          </BookGalleryContainer>}
        {books.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

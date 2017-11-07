import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/utils';

import BooksContainer from '../containers/BooksContainer';
import FooterContainer from '../containers/FooterContainer';

export default class Library extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeLibraryBook: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired,
  }

  handleDeleteBook = (event, googleVolumeId) => {
    const { books, deleteBook } = this.props;
    const bookId = !googleVolumeId ? event.target.parentElement.getAttribute('data') : googleVolumeId;
    const newBooks = books.filter(book => book.googleVolumeId !== bookId);
    deleteBook(newBooks);

    const book = books.filter(el => el.googleVolumeId === bookId)[0];
    const libraryContainer = document.querySelector('html');
    const notificationSuccess = utils.createElement('span', 'notification__library--success');
    libraryContainer.appendChild(notificationSuccess);
    notificationSuccess.innerHTML = `${book.title} has been deleted!`;
    setTimeout(() => libraryContainer.removeChild(notificationSuccess), 1000);
  }

  render() {
    const { books, activeLibraryBook } = this.props;
    return (
      <div className="library-container">
        {books && <BooksContainer activeBook={activeLibraryBook} showBooks={books} onClickIcon={this.handleDeleteBook} icon="trash" />}
        {books.length > 40 ? <FooterContainer /> : null}
      </div>
    );
  }
}

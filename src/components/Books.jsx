import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookContainer from '../containers/BookContainer';

import * as utils from '../utils/utils';

export default class Books extends Component {
  static propTypes = {
    activeBook: PropTypes.object,
    books: PropTypes.arrayOf(PropTypes.object),
    library: PropTypes.bool,
  }

  static defaultProps = {
    books: [{}],
    library: false,
    activeBook: {},
  }

  displayError = (book) => {
    const bookGalleryContainer = document.querySelector('html');
    const notificationError = utils.createElement('span', 'notification__library--error');
    bookGalleryContainer.appendChild(notificationError);
    notificationError.innerHTML = `${book.title} is already in your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationError), 1000);
  }

  displaySuccess = (book, verbiage) => {
    const bookGalleryContainer = document.querySelector('html');
    const notificationSuccess = utils.createElement('span', 'notification__library--success');
    bookGalleryContainer.appendChild(notificationSuccess);
    notificationSuccess.innerHTML = `${book.title} has been ${verbiage} your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationSuccess), 1000);
  }

  renderBooks = book => (
    <BookContainer
      book={book}
      activeBook={this.props.activeBook}
      books={this.props.books}
      displayError={this.displayError}
      displaySuccess={this.displaySuccess}
    />
  )

  render() {
    const { books } = this.props;
    return (
      <div className="book-gallery-container">
        <ul className="books__container">
          {books.map(book => this.renderBooks(book))}
        </ul>
      </div>
    );
  }
}

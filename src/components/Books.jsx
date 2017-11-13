import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookContainer from '../containers/BookContainer';

import * as utils from '../utils/utils';

export default class Books extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    books: PropTypes.object.isRequired, // not from redux
  };

  static defaultProps = {
    libraryBooks: [{}],
    modal: {},
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
      books={this.props.books.list}
      displayError={this.displayError}
      displaySuccess={this.displaySuccess}
    />
  )

  render() {
    const { books, loading } = this.props;
    return (
      <div className="book-gallery-container">
        <ul className="books__container">
          {books.list.map(book => this.renderBooks(book))}
        </ul>
      </div>
    );
  }
}

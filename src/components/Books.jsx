import React from 'react';
import PropTypes from 'prop-types';

import BookContainer from '../containers/BookContainer';

import * as utils from '../utils/utils';

const Books = (props) => {
  const displayError = (book) => {
    const bookGalleryContainer = document.querySelector('html');
    const notificationError = utils.createElement('span', 'notification__library--error');
    bookGalleryContainer.appendChild(notificationError);
    notificationError.innerHTML = `${book.title} is already in your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationError), 1000);
  };

  const displaySuccess = (book, verbiage) => {
    const bookGalleryContainer = document.querySelector('html');
    const notificationSuccess = utils.createElement('span', 'notification__library--success');
    bookGalleryContainer.appendChild(notificationSuccess);
    notificationSuccess.innerHTML = `${book.title} has been ${verbiage} your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationSuccess), 1000);
  };

  const renderBooks = book => (
    <BookContainer
      book={book}
      activeBook={props.activeBook}
      books={props.books}
      displayError={displayError}
      displaySuccess={displaySuccess}
    />
  );

  return (
    <div className="book-gallery-container">
      <ul className="books__container">
        {props.books.map(book => renderBooks(book))}
      </ul>
    </div>
  );
};

Books.propTypes = {
  activeBook: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Books;

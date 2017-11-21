import React from 'react';
import PropTypes from 'prop-types';

import BookContainer from '../containers/BookContainer';

const Books = props => (
  <div className="book-gallery-container">
    <ul className="books__container">
      {props.books.map(book => (
        <BookContainer
          key={book.id}
          book={book}
        />
      ))}
    </ul>
  </div>
);

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Books;

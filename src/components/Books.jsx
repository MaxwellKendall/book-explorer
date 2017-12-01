import React from 'react';
import PropTypes from 'prop-types';

import BookContainer from '../containers/BookContainer';

const Books = (props) => {
  const { books } = props;
  return (
    <div className="book-gallery-container">
      <ul className="books__container">
        {books.map(book => (
          <BookContainer
            key={book.id}
            book={book}
          />
        ))}
      </ul>
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Books;

/**
 * I. Books: Line 6
 *   App is a Stateless Functional Component
 *     - these make props avaialbe @ props.xyz instead of a stateful component which would be this.props.xyz
 * II. BookContainer: Line 12
 *   Passing props to component
 *     - pass props to a component
 *     - book will have props key & book avaiable by this.props.key & this.props.book
*/

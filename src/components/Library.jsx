import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/utils';

import BooksContainer from '../containers/BooksContainer';

export default class Library extends Component {
  static propTypes = {
  }

  deleteBook = (event) => {
    const { books, deleteBook } = this.props;
    const bookId = Number(event.target.parentElement.getAttribute('value'));
    // console.log(bookId);
    // console.log(books[0].id)
    const newBooks = books.filter(book => book.id !== bookId);
    deleteBook(newBooks);
  }

  renderBooks = () => {
    const { books } = this.props;
    return books.map((book, index) => {
      const config = {
        book,
        index,
        onClickImage: () => console.log('image clicked'),
        onClickIcon: () => console.log('icon clicked'),
      };
      return utils.renderBookImage(config);
    });
  }

  render() {
    const { books } = this.props;
    return (
      <div className="library-container">
        <h1>My Library</h1>
        {books && <BooksContainer showBooks={books} onClickIcon={(event) => this.deleteBook(event)} icon="trash" />}
      </div>
    );
  }
}

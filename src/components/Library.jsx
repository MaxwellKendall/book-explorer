import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/utils';

import BooksContainer from '../containers/BooksContainer';
import FooterContainer from '../containers/FooterContainer';

export default class Library extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeLibraryBook: PropTypes.object.isRequired,
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

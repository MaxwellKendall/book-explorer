import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/utils';

import Loading from './common/Loading';

import BooksContainer from '../containers/BooksContainer';
import BookModalContainer from '../containers/BookModalContainer';
import FooterContainer from '../containers/FooterContainer';

export default class BookGallery extends Component {
  static propTypes = {
    searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { getSearchedBooks, location } = this.props;
    getSearchedBooks(location.pathname.substr(1));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.getSearchedBooks(nextProps.location.pathname.substr(1));
    }
  }

  handleAddToMyLibrary = (event) => {
    const { searchedBooks, addToMyLibrary, books } = this.props;
    const notification_error = document.querySelector('.notification__library--error');
    const notification_success = document.querySelector('.notification__library--success');
    const book = searchedBooks[event.target.parentElement.value];
    const test = books.length > 0 ? books.some(el => book.industryIdentifiers[0] === el.industryIdentifiers[0]) : false;
    if (test === true) {
      utils.removeClass(notification_error, 'hidden');
      setTimeout(() => notification_error.classList.add('hidden'), 3000);
    }
    if (test === false) {
      addToMyLibrary(book);
      utils.removeClass(notification_success, 'hidden');
      setTimeout(() => notification_success.classList.add('hidden'), 3000);
    }
  }

  render() {
    const { searchedBooks } = this.props;
    return (
      <div className="book-gallery-container">
        <span className="notification__library--success hidden">This book was added to your library!</span>
        <span className="notification__library--error hidden">You already got this book in your library, homie!</span>
        {searchedBooks && <BooksContainer showBooks={searchedBooks} onClickIcon={this.handleAddToMyLibrary} icon="plus-circle" />}
        {!searchedBooks && <Loading />}
      </div>
    );
  }
}

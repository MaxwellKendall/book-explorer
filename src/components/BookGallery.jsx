import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/utils';

import Loading from './common/Loading';

import BooksContainer from '../containers/BooksContainer';
import FooterContainer from '../containers/FooterContainer';

export default class BookGallery extends Component {
  static propTypes = {
    searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    activeSearchedBook: PropTypes.object.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  componentDidMount() {
    // TODO: Put the API call on the Search Button instead of this
    const { getSearchedBooks, location } = this.props;
    getSearchedBooks(location.pathname.substr(1));
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.pathname !== this.props.location.pathname) {
  //     this.props.getSearchedBooks(nextProps.location.pathname.substr(1));
  //   }
  // }

  handleAddToMyLibrary = (event, activeBook) => {
    const { searchedBooks, addToMyLibrary, books } = this.props;

    const googleVolumeId = !activeBook ? event.target.parentElement.getAttribute('data') : activeBook.googleVolumeId;
    const book = searchedBooks.filter(el => el.googleVolumeId === googleVolumeId)[0] || activeBook;

    const bookGalleryContainer = document.querySelector('html');
    const notificationError = utils.createElement('span', 'notification__library--error');
    const notificationSuccess = utils.createElement('span', 'notification__library--success');
    const test = books.length > 0 ? books.some(el => el.googleVolumeId === googleVolumeId) : false;
    if (test === true) {
      bookGalleryContainer.appendChild(notificationError);
      notificationError.innerHTML = `${book.title} is already in your library!`;
      setTimeout(() => bookGalleryContainer.removeChild(notificationError), 1000);
    }
    if (test === false) {
      addToMyLibrary(book);
      bookGalleryContainer.appendChild(notificationSuccess);
      notificationSuccess.innerHTML = `${book.title} has been added to your library!`;
      setTimeout(() => bookGalleryContainer.removeChild(notificationSuccess), 1000);
    }
  }

  render() {
    const { searchedBooks, loading, activeSearchedBook, totalSearched } = this.props;
    return (
      <div className="book-gallery-container">
        {searchedBooks && <BooksContainer activeBook={activeSearchedBook} showBooks={searchedBooks} onClickIcon={this.handleAddToMyLibrary} icon="plus-circle" />}
        {!searchedBooks && loading && <Loading />}
        {totalSearched > 40 ? <FooterContainer /> : null}
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './common/Icon';

import BookModalContainer from '../containers/BookModalContainer';
import FooterContainer from '../containers/FooterContainer';

export default class Books extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    activeBook: PropTypes.object.isRequired,
    showBooks: PropTypes.arrayOf(PropTypes.object).isRequired, // not from redux
  };

  state = {
    modal: false,
  };

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

  hideModal = () => {
    this.setState(({
      modal: false,
    }));
  }

  renderModal = (event, id) => {
    event.preventDefault();
    this.props.selectBook(id);
    this.setState(({
      modal: true,
    }));
  }

  renderBooks = (book) => {
    let markup;

    if (book.imageLinks) {
      markup = (<li key={book.googleVolumeId} data={book.googleVolumeId}>
        <a href="" onClick={event => this.renderModal(event, book.googleVolumeId)} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon icon="plus-circle" onClick={event => this.handleAddToMyLibrary(event)} />
        <Icon icon="trash" onClick={event => this.handleDeleteBook(event)} />
      </li>);
    } else {
      markup = (<li id="book--no-image" key={book.googleVolumeId}>
        <div className="book__no-image">
          <a href="" onClick={event => this.renderModal(event, book.googleVolumeId)}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
            <Icon icon="plus-circle" onClick={event => this.handleAddToMyLibrary(event)} />
            <Icon icon="trash" onClick={event => this.handleDeleteBook(event)} />
          </a>
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    // TODO: Fix the Modal which needs to know how to delete/add on click; I'm passing a new object to the prop which was formerly just passed
    // "onClickIcon"
    const { showBooks, activeBook } = this.props;
    return (
      <div className="books">
        {this.state.modal &&
          <BookModalContainer
            hideModal={this.hideModal}
            activeBook={activeBook}
            showBooks={showBooks}
            onClickIcon={{
              delete: this.handleDeleteBook,
              add: this.handleAddToMyLibrary
            }}
          />}
        <ul className="books__container">
          {showBooks.map(book => this.renderBooks(book))}
        </ul>
      </div>
    );
  }
}

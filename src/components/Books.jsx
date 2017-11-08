import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookImageContainer from '../containers/BookImageContainer';

import Icon from './common/Icon';
import Loading from './common/Loading';

import * as utils from '../utils/utils';

export default class Books extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
    deleteBook: PropTypes.func.isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    activeBook: PropTypes.object.isRequired,
    showBooks: PropTypes.arrayOf(PropTypes.object).isRequired, // not from redux
  };

  static defaultProps = {
    libraryBooks: [{}],
  }

  displayErrorNotification = (book) => {
    const bookGalleryContainer = document.querySelector('html');
    const notificationError = utils.createElement('span', 'notification__library--error');
    bookGalleryContainer.appendChild(notificationError);
    notificationError.innerHTML = `${book.title} is already in your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationError), 1000);
  }

  displaySuccessNotification = (book, verbiage) => {
    const bookGalleryContainer = document.querySelector('html');
    const notificationSuccess = utils.createElement('span', 'notification__library--success');
    bookGalleryContainer.appendChild(notificationSuccess);
    notificationSuccess.innerHTML = `${book.title} has been ${verbiage} your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationSuccess), 1000);
  }

  handleAddToMyLibrary = (newBook) => {
    const { addToMyLibrary, libraryBooks } = this.props;
    if (libraryBooks.some(book => book.id === newBook.id)) {
      this.displayErrorNotification(newBook);
    } else {
      addToMyLibrary(newBook);
      this.displaySuccessNotification(newBook, 'added to');
    }
  }

  handleDeleteBook = (book, config) => {
    const { deleteBook } = this.props;
    deleteBook(book.id);
    this.displaySuccessNotification(book, 'deleted from');
    if (config.modal === true) {
      this.goNext();
    }
  }

  goNext = (activeBook) => {
    this.props.selectBook(activeBook.id);
    const { showBooks, selectBook } = this.props;
    let nextBookIndex = showBooks.books.indexOf(activeBook) + 1;
    this.renderModal(null, showBooks.books[nextBookIndex]);
  }

  goPrevious = () => { console.log('goprevious'); }

  renderModal = (event, book) => {
    // on intital click, active book needs to be se
    event ? event.preventDefault() : null;
    this.props.selectBook(book.id);

    const library = this.props.showBooks.library;

    const modal = {
      book: book ? book : { id: 0 },
      library,
      title: book.title,
      Content: BookImageContainer,
      disableOnClickOutside: false,
      setLoading: this.props.setLoading,
      loading: this.props.loading,
      handleDeleteBook: this.handleDeleteBook,
      handleAddToMyLibrary: this.handleAddToMyLibrary,
      goNext: this.goNext,
      goPrevious: this.goPrevious,
    };
    this.props.showModal(modal);
  }

  renderBooks = (book) => {
    let markup;

    if (book.imageLinks) {
      markup = (<li key={book.id} data={book.id}>
        <a href="" onClick={event => this.renderModal(event, book)} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon icon="plus-circle" onClick={() => this.handleAddToMyLibrary(book)} />
        <Icon icon="trash" onClick={() => this.handleDeleteBook(book)} />
      </li>);
    } else {
      markup = (<li id="book--no-image" key={book.id}>
        <div className="book__no-image">
          <a href="" onClick={event => this.renderModal(event, book.id)}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
            <Icon icon="plus-circle" onClick={() => this.handleAddToMyLibrary(book)} />
            <Icon icon="trash" onClick={() => this.handleDeleteBook(book)} />
          </a>
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    // TODO: Render Modal via Action Creator that passes props to modal via state
    const { showBooks, loading } = this.props;
    return (
      <div className="book-gallery-container">
        {loading && <Loading />}
        {!loading &&
        <ul className="books__container">
          {showBooks.books.map(book => this.renderBooks(book))}
        </ul>}
      </div>
    );
  }
}

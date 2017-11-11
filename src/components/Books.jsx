import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
    showBooks: PropTypes.object.isRequired, // not from redux
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
    const { deleteBook, libraryBooks, hideModal } = this.props;
    if (config && config.modal === true && libraryBooks.length === 1) {
      hideModal();
    } else if (config && config.modal === true) {
      this.goNext(book);
    }
    deleteBook(book.id);
    this.displaySuccessNotification(book, 'deleted from');
  }

  goNext = (activeBook) => {
    // handle situation where last item is selected
    const { showBooks } = this.props;
    const nextBookIndex = showBooks.books.indexOf(activeBook) + 1;
    if (nextBookIndex < showBooks.books.length) {
      this.renderModal(null, showBooks.books[nextBookIndex]);
    } else if (nextBookIndex >= showBooks.books.length) {
      this.props.hideModal();
    }
  }

  goPrevious = (activeBook) => {
    this.props.selectBook(activeBook.id);
    const { showBooks } = this.props;
    const previousBookIndex = showBooks.books.indexOf(activeBook) - 1;
    if (previousBookIndex > -1) {
      this.renderModal(null, showBooks.books[previousBookIndex]);
    } else if (previousBookIndex === -1) {
      this.props.hideModal();
    }
  }

  renderModal = (event, activeBook) => {
    event ? event.preventDefault() : null;
    this.props.selectBook(activeBook.id);

    const library = this.props.showBooks.library;
    const modal = {
      activeBook,
      library,
      title: activeBook.title,
      Content: BookImageContainer,
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
    const { showBooks, modal } = this.props;
    const hideAddIcon = cx({ 'hidden': showBooks.library }); // when library is true, hide the + icon
    const hideDeleteIcon = cx({ 'hidden': !showBooks.library }); // when library is false, hide the Delete Icon
    let markup;

    if (book.imageLinks) {
      markup = (<li key={book.id} data={book.id}>
        <a href="" onClick={event => modal !== null ? null : this.renderModal(event, book)} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon className={hideAddIcon} icon="plus-circle" onClick={() => modal !== null ? null : this.handleAddToMyLibrary(book)} />
        <Icon className={hideDeleteIcon} icon="trash" onClick={() => modal !== null ? null : this.handleDeleteBook(book)} />
      </li>);
    } else {
      markup = (<li id="book--no-image" key={book.id}>
        <div className="book__no-image">
          <a href="" onClick={event => modal !== null ? null : this.renderModal(event, book.id)}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
            <Icon className={hideAddIcon} icon="plus-circle" onClick={() => modal !== null ? null : this.handleAddToMyLibrary(book)} />
            <Icon className={hideDeleteIcon} icon="trash" onClick={() => modal !== null ? null : this.handleDeleteBook(book)} />
          </a>
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    const { showBooks, loading } = this.props;
    return (
      <div className="book-gallery-container">
        <ul className="books__container">
          {showBooks.books.map(book => this.renderBooks(book))}
        </ul>
      </div>
    );
  }
}

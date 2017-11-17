import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BookImageContainer from '../containers/BookImageContainer';

import Icon from './common/Icon';

export default class Book extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.object,
    activeBook: PropTypes.object.isRequired, // not redux
    books: PropTypes.arrayOf(PropTypes.object).isRequired, // not redux
    book: PropTypes.object.isRequired, // not redux
    key: PropTypes.string, // not redux
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    displayNotification: PropTypes.func.isRequired, // not redux
  };

  static defaultProps = {
    modal: {},
    key: '',
  }

  componentDidUpdate(nextProps) {
    if (nextProps.activeBook.id !== this.props.activeBook.id) {
      this.renderModal();
    }
  }

  handleAddToMyLibrary = (e, book = this.props.activeBook) => {
    // TODO: move to book image
    e.preventDefault();
    const node = (e.target.parentElement);
    const { addToMyLibrary, displayNotification, modal } = this.props;
    addToMyLibrary(book);
    displayNotification(book, 'added to', true, node, modal);
  }

  handleDeleteBook = (e, book = this.props.activeBook) => {
    // TODO: move to book image
    e.preventDefault();
    const { deleteBook, books, hideModal, modal, displayNotification } = this.props;
    if (modal && books.length === 1) {
      hideModal();
    } else if (modal && books.length > 1) {
      this.goNext();
    }
    deleteBook(book.id);
    displayNotification(book, 'deleted from', false, modal);
  }

  goNext = () => {
    // TODO: move to book image
    const { activeBook, selectBook, books, loading } = this.props;
    const nextBookIndex = books.indexOf(activeBook) + 1;
    if (nextBookIndex < books.length && !loading) {
      selectBook(books[nextBookIndex].id);
    } else if (nextBookIndex >= books.length - 1) {
      this.closeModal();
    }
  }

  goPrevious = () => {
    // TODO: move to book image
    const { selectBook, books, activeBook, loading } = this.props;
    const previousBookIndex = books.indexOf(activeBook) - 1;

    if (previousBookIndex > -1 && !loading) {
      selectBook(books[previousBookIndex].id);
    } else if (previousBookIndex === -1) {
      this.closeModal();
    }
  }

  closeModal = () => {
    this.props.hideModal();
    this.props.selectBook('0');
  }

  handleClick = (e) => {
    e.preventDefault();
    const { book, selectBook } = this.props;

    selectBook(book.id);
  }

  renderModal = () => {
    const { activeBook, showModal } = this.props;
    if (activeBook.title) {
      const modal = {
        Content: BookImageContainer,
        title: activeBook.title,
        activeBook,
        handleDeleteBook: this.handleDeleteBook,
        handleAddToMyLibrary: this.handleAddToMyLibrary,
        goNext: this.goNext,
        goPrevious: this.goPrevious,
      };

      showModal(modal);
    }
  }

  renderBooks = () => {
    // TODO: Move this all to be inside the render method
    const { book, key } = this.props;
    // const library = cx({ hidden: window.location.href.substr(35) === '/library' });
    // const searchedBooks = cx({ hidden: window.location.href.substr(21) === '/book-explorer' });
    const library = cx({ hidden: window.location.href.substr(46) === '/library' });
    const searchedBooks = cx({ hidden: window.location.href.substr(32) === '/book-explorer' });
    let markup;

    if (book.imageLinks) {
      markup = (<li key={key} className={`${book.id}`}>
        <a href="" onClick={this.handleClick} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon className={library} icon="plus-circle" onClick={event => this.handleAddToMyLibrary(event, book)} />
        <Icon className={searchedBooks} icon="trash" onClick={event => this.handleDeleteBook(event, book)} />
      </li>);
    } else {
      markup = (<li key={key} className={`${book.id} book--no-image`}>
        <div className="book__no-image">
          <a href="" onClick={this.renderModal}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
          </a>
          <Icon className={library} icon="plus-circle" onClick={event => this.handleAddToMyLibrary(event, book)} />
          <Icon className={searchedBooks} icon="trash" onClick={event => this.handleDeleteBook(event, book)} />
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    return this.renderBooks();
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BookImageContainer from '../containers/BookImageContainer';

import Icon from './common/Icon';

export default class Books extends Component {
  static propTypes = {
    addToMyLibrary: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired, // not redux
    activeBook: PropTypes.object.isRequired, // not redux
    books: PropTypes.arrayOf(PropTypes.object).isRequired, // not redux
    library: PropTypes.bool, // not redux
    displayError: PropTypes.func.isRequired, // not redux
    displaySuccess: PropTypes.func.isRequired, // not redux
  };

  static defaultProps = {
    modal: {},
    library: false,
  }

  componentDidUpdate(nextProps) {
    if (nextProps.activeBookId !== this.props.activeBookId) {
      this.renderModal();
    }
  }

  handleAddToMyLibrary = (e, book = this.props.activeBook) => {
    e.preventDefault();
    const { addToMyLibrary, displaySuccess } = this.props;
    addToMyLibrary(book);
    displaySuccess(book, 'added to');
  }

  handleDeleteBook = (e, book = this.props.activeBook) => {
    e.preventDefault();
    const { deleteBook, books, hideModal, modal } = this.props;
    if (modal.title && books.length === 1) {
      hideModal();
    } else if (modal.title && books.length > 1) {
      this.goNext();
    }
    deleteBook(book.id);
    this.props.displaySuccess(book, 'deleted from');
  }

  goNext = () => {
    const { activeBook, selectBook, books } = this.props;
    const nextBookIndex = books.indexOf(activeBook) + 1;
    if (nextBookIndex < books.length) {
      selectBook(books[nextBookIndex].id);
    } else if (nextBookIndex >= books.length - 1) {
      this.closeModal();
    }
  }

  goPrevious = () => {
    const { selectBook, books, activeBook } = this.props;
    const previousBookIndex = books.indexOf(activeBook) - 1;

    if (previousBookIndex > -1) {
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
        setLoading: this.props.setLoading,
        loading: this.props.loading,
        handleDeleteBook: this.handleDeleteBook,
        handleAddToMyLibrary: this.handleAddToMyLibrary,
        goNext: this.goNext,
        goPrevious: this.goPrevious,
      };
      showModal(modal);
    }
  }

  renderBooks = () => {
    const { book } = this.props;
    const library = cx({ 'hidden': window.location.href.substr(35) === '/library' });
    const searchedBooks = cx({ 'hidden': window.location.href.substr(21) ===  '/book-explorer' });

    let markup;

    if (book.imageLinks) {
      markup = (<li key={book.id} data={book.id}>
        <a href="" onClick={this.handleClick} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon className={library} icon="plus-circle" onClick={() => this.handleAddToMyLibrary(event, book)} />
        <Icon className={searchedBooks} icon="trash" onClick={() => this.handleDeleteBook(event, book)} />
      </li>);
    } else {
      markup = (<li id="book--no-image" key={book.id}>
        <div className="book__no-image">
          <a href="" onClick={this.renderModal}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
          </a>
          <Icon className={library} icon="plus-circle" onClick={() => this.handleAddToMyLibrary(event, book)} />
          <Icon className={searchedBooks} icon="trash" onClick={() => this.handleDeleteBook(event, book)} />
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    return this.renderBooks();
  }
}

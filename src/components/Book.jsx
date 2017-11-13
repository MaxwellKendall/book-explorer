import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BookImageContainer from '../containers/BookImageContainer';

import Icon from './common/Icon';

export default class Books extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    library: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    modal: PropTypes.object,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired, // not from redux
  };

  static defaultProps = {
    modal: {},
  }

  handleAddToMyLibrary = (newBook) => {
    const { addToMyLibrary } = this.props;
    addToMyLibrary(newBook);
    this.props.displaySuccess(newBook, 'added to');
  }

  handleDeleteBook = (book, config) => {
    const { deleteBook, libraryBooks, hideModal } = this.props;
    if (config && config.modal === true && libraryBooks.length === 1) {
      hideModal();
    } else if (config && config.modal === true) {
      this.goNext(book);
    }
    deleteBook(book.id);
    this.props.displaySuccess(book, 'deleted from');
  }

  goNext = () => {
    const { book, books } = this.props;
    const nextBookIndex = books.indexOf(book) + 1;
    if (nextBookIndex < books.length) {
      this.renderModal(null, books[nextBookIndex]);
    } else if (nextBookIndex >= books.length) {
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

  renderModal = (e) => {
    e.preventDefault();
    const { book, selectBook, library } = this.props;

    selectBook(book.id);

    const modal = {
      book,
      library,
      title: book.title,
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

  renderBooks = () => {
    const { book, modal } = this.props;
    const hideAddIcon = cx({ 'hidden': this.props.library }); /* eslint-disable-quote-props */
    const hideDeleteIcon = cx({ 'hidden': !this.props.library }); // when library is false, hide the Delete Icon

    let markup;

    if (book.imageLinks) {
      markup = (<li key={book.id} data={book.id}>
        <a href="" onClick={this.renderModal} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon className={hideAddIcon} icon="plus-circle" onClick={this.handleAddToMyLibrary} />
        <Icon className={hideDeleteIcon} icon="trash" onClick={this.handleDeleteBook} />
      </li>);
    } else {
      markup = (<li id="book--no-image" key={book.id}>
        <div className="book__no-image">
          <a href="" onClick={this.renderModal}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
          </a>
          <Icon className={hideAddIcon} icon="plus-circle" onClick={this.handleAddToMyLibrary} />
          <Icon className={hideDeleteIcon} icon="trash" onClick={this.handleDeleteBook} />
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    return this.renderBooks();
  }
}

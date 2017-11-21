import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BookImageContainer from '../containers/BookImageContainer';

import Icon from './common/Icon';
import * as Modal from './common/ModalWrapper';

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired, // not redux
    key: PropTypes.string, // not redux
    setModal: PropTypes.func.isRequired,
    activeBook: PropTypes.object,
    addToMyLibrary: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeBook: {},
    activeBookId: '0',
    modal: {},
    key: '',
  }

  static contextTypes = {
    store: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBook.id !== this.props.activeBook.id && nextProps.activeBook) {
      this.renderModal(nextProps.activeBook);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { book, selectBook } = this.props;
    selectBook(book.id);
  }

  renderModal = (book = this.props.activeBook) => {
    // active book is not updated when called initially
    const { setModal } = this.props;
    const Content = <BookImageContainer store={this.context.store} />;
    const modal = {
      Content,
      title: book.title,
    };
    Modal.showModal(modal);
    setModal(true);
  }

  render() {
    const { book, key, deleteBook, addToMyLibrary, location } = this.props;
    const library = cx({ hidden: location === '/book-explorer/library' });
    const searchedBooks = cx({ hidden: location === '/book-explorer' });
    return (
      <li key={key} className={book.imageLinks ? `${book.id}` : `${book.id} book--no-image`}>
        {book.imageLinks && <a href="" onClick={this.handleClick} >
          <img src={book.imageLinks.thumbnail} alt="whateva" />
        </a>}
        {!book.imageLinks && <div className="book__no-image">
          <a href="" onClick={this.handleClick}>
            <span>Image Not Available</span>
            <span>Page Count: {book.pageCount}</span>
            <span>Title: {book.title}</span>
          </a>
        </div>}
        <Icon className={library} icon="plus-circle" onClick={() => addToMyLibrary(book)} />
        <Icon className={searchedBooks} icon="trash" onClick={() => deleteBook(book.id)} />
      </li>
    );
  }
}

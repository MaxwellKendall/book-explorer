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
    modal: PropTypes.bool.isRequired,
    activeBook: PropTypes.object,
    updateLibrary: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.string.isRequired,
  };

  static defaultProps = {
    libraryBooks: [{}],
    activeBook: {},
    key: '',
  }

  static contextTypes = {
    store: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.book.id === nextProps.activeBook.id) {
      this.renderModal(nextProps.activeBook);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { book, selectBook } = this.props;
    selectBook(book.id);
  }

  renderModal = (book = this.props.activeBook) => {
    const { setModal, modal } = this.props;
    const Content = <BookImageContainer store={this.context.store} />;
    const config = {
      Content,
      title: book.title,
    };
    Modal.showModal(config);
    if (!modal) {
      setModal(true);
    }
  }

  render() {
    const { book, key, updateLibrary, libraryBooks, location } = this.props;
    const library = cx({ hidden: location === '/book-explorer/library' });
    const searchedBooks = cx({ hidden: location === '/book-explorer' });
    const added = cx({ added: libraryBooks.some(libraryBook => libraryBook.id === book.id) });
    return (
      <li key={key} className={book.imageLinks ? `${book.id} ${added}` : `${book.id} book--no-image ${added}`}>
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
        <Icon className={library} icon="plus-circle" onClick={() => updateLibrary(book, 'add')} />
        <Icon className={searchedBooks} icon="trash" onClick={() => updateLibrary(book, 'remove')} />
      </li>
    );
  }
}

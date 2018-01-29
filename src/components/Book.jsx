import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BookImageContainer from '../containers/BookImageContainer';

import Icon from './common/Icon';
import * as Modal from './common/ModalWrapper';

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    key: PropTypes.string,
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
    if (this.props.book.id === nextProps.activeBook.id && this.props.activeBook.id !== nextProps.activeBook.id) {
      this.renderModal(nextProps.activeBook);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { book, selectBook } = this.props;
    selectBook(book.id); // executes action creator
  }

  handleAdd = () => {
    this.props.updateLibrary(this.props.book, 'add'); // executes action creator
  }

  handleDelete = () => {
    this.props.updateLibrary(this.props.book, 'remove'); // executes action creator
  }

  renderModal = (book = this.props.activeBook) => {
    const { setModal, modal, selectBook } = this.props;
    const handleClose = () => {
      Modal.closeModal();
      selectBook('0');
      setModal(false);
    };
    const Content = <BookImageContainer store={this.context.store} />;
    const config = {
      Content,
      title: book.title,
      disableOnClickOutside: true,
      closeModal: handleClose,
    };
    Modal.showModal(config); // function that displays portal (See common/ModaWrapper.jsx)
    if (!modal) {
      setModal(true); // executes action creator
    }
  }

  render() {
    const { book, key, libraryBooks, location } = this.props;
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
        <Icon className={library} icon="plus-circle" onClick={this.handleAdd} />
        <Icon className={searchedBooks} icon="trash" onClick={this.handleDelete} />
      </li>
    );
  }
}

/**
 * I. componentWillReceiveProps: Line 33
 *   React is telling us when newProps from Redux come in
 *     - At this point, we tell the component to execute the renderModal function when newProps come in from Redux as parameters
 * II. cx(): Lines 72, 73, & 74
 *   - Allows for passing classes upon certain conditions
 *   - documentation: https://www.npmjs.com/package/classnames
 * III. Conditional Rendering via interpolation: Lines 77 & 80
 *   - if props.xyz === X, show Y
 */

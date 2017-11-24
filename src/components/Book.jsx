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
    updateLibrary: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.string.isRequired,
  };

  static defaultProps = {
    libraryBooks: [{}],
    activeBook: {},
    modal: {},
    key: '',
  }

  static contextTypes = {
    store: PropTypes.object,
  };

  state = {
    modal: false,
  }

  componentWillReceiveProps(nextProps) {
    // // solution 2
    if (nextProps.activeBook.id !== this.props.activeBook.id && nextProps.activeBook) {
      this.renderModal(nextProps.activeBook);
    }
  }

  // shouldComponentUpdate(nextProps) {
  // // solution 1
  //   let rtrn = false;
  //   if (nextProps.activeBook.id !== this.props.activeBook.id && nextProps.activeBook) {
  //     rtrn = true;
  //   }
  //   return rtrn;
  // }

  handleClick = (e) => {
    e.preventDefault();
    const { book, selectBook } = this.props;
    selectBook(book.id);
    // // solution 1
    // this.setState(prevState => ({ ...prevState, modal: true }), this.renderModal);
  }

  renderModal = (book = this.props.activeBook) => {
    // // solution 2
    const { setModal } = this.props;
    const Content = <BookImageContainer store={this.context.store} />;
    const modal = {
      Content,
      title: book.title,
    };
    Modal.showModal(modal);
    setModal(true);
  }

  // renderModal = () => {
  // // Solution 1
  //   const { setModal, activeBook } = this.props;
  //   const Content = <BookImageContainer store={this.context.store} />;
  //   const modal = {
  //     Content,
  //     title: activeBook.title,
  //   };
  //   if (this.state.modal) {
  //     Modal.showModal(modal);
  //     setModal(true);
  //   }
  // }

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
        {/* Solution 1 */}
        {/* {this.renderModal()} */}
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

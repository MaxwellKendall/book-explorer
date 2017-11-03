import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import BookImage from './BookImage';
import Modal from './common/Modal';

import * as utils from '../utils/utils';

export default class BookModal extends Component {
  static displayName = 'Book Modal';

  static propTypes = {
    activeBookId: PropTypes.number.isRequired,
    activeBook: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    addToMyLibrary: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  handleDeleteBook = () => {
    const { books, deleteBook, activeBook } = this.props;
    const newBooks = books.filter(book => book.id !== activeBook.id);
    deleteBook(newBooks);
  }

  handleAddToMyLibrary = () => {
    const { activeBook, books, addToMyLibrary } = this.props;
    const notification_error = document.querySelector('.notification-modal__library--error');
    const notification_success = document.querySelector('.notification-modal__library--success');
    const test = books.length > 0 ? books.some(el => activeBook.industryIdentifiers[0] === el.industryIdentifiers[0]) : false;
    if (test === true) {
      utils.removeClass(notification_error, 'hidden');
      setTimeout(() => notification_error.classList.add('hidden'), 3000);
    }
    if (test === false) {
      addToMyLibrary(activeBook);
      utils.removeClass(notification_success, 'hidden');
      setTimeout(() => notification_success.classList.add('hidden'), 3000);
    }
  }

  goToNextBook = () => {
    const { setLoading, selectBook, activeBookId } = this.props;
    selectBook(activeBookId + 1);
    setLoading(true);
  };

  goToPreviousBook = () => {
    const { setLoading, selectBook, activeBookId } = this.props;
    selectBook(activeBookId - 1);
    setLoading(true);
  };

  render() {
    const { addToMyLibrary, activeBookId, activeBook, hideModal, loading, setLoading } = this.props;
    return (
      <div className="modal">
        <Modal
          modal={{
            activeBook,
            loading,
            setLoading,
            Content: BookImage,
            title: activeBook.title,
            onOutsideClick: hideModal,
          }}
          hideModal={hideModal}
          goNext={this.goToNextBook}
          handleDeleteBook={this.handleDeleteBook}
          handleAddToMyLibrary={this.handleAddToMyLibrary}
          goPrevious={activeBookId !== 0 ? this.goToPreviousBook : () => { window.alert('There is no Previous to this book, man. Go forward instead'); }}
        />
      </div>
    );
  }
}

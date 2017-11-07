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
    onClickIcon: PropTypes.func.isRequired,
    activeBook: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    showBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {};

  getNextBookId = (showBooks, activeBookId) => {
    let nextBookIndex = showBooks.map((el, index) => {
      if (el.googleVolumeId === activeBookId) {
        return index + 1;
      }
    });
    nextBookIndex = nextBookIndex.filter(el => el !== undefined);
    return nextBookIndex[0];
  }

  handleDeleteBook = (event, deletedBook) => {
    const { books, activeBookId, selectBook, onClickIcon } = this.props;
    const nextBook = this.getNextBookId(books, activeBookId);
    console.log('nextBook: ', books[nextBook], 'onClickIcon', onClickIcon, 'activeBookId: ', activeBookId);
    books[nextBook] ? selectBook(books[nextBook].googleVolumeId) : null;
    onClickIcon(null, activeBookId);
  }

  goToNextBook = () => {
    const { setLoading, selectBook, activeBookId, showBooks } = this.props;
    setLoading(true);
    let nextBook = this.getNextBookId(showBooks, activeBookId);
    nextBook = showBooks[nextBook].googleVolumeId;
    if (nextBook) {
      selectBook(nextBook);
      setLoading(true);
    }
  };

  goToPreviousBook = () => {
    const { setLoading, selectBook, activeBookId, showBooks } = this.props;

    let previousBook = this.getNextBookId(showBooks, activeBookId) - 2;
    previousBook = showBooks[previousBook].googleVolumeId;
    if (previousBook) {
      selectBook(previousBook);
      setLoading(true);
    }
  };

  render() {
    const { activeBookId, activeBook, hideModal, loading, setLoading, onClickIcon } = this.props;
    return (
      <div className="modal">
        {activeBook && <Modal
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
          onClickIcon={onClickIcon}
          goPrevious={activeBookId !== 0 ? this.goToPreviousBook : () => { window.alert('There is no Previous to this book, man. Go forward instead'); }}
        />}
      </div>
    );
  }
}

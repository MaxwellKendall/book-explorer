import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import BookImage from './BookImage';
import Modal from './common/Modal';

export default class BookModal extends Component {
  static displayName = 'Book Modal';

  static propTypes = {
    activeBookId: PropTypes.number.isRequired,
    activeBook: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  goToNextBook = () => {
    const { selectBook, activeBookId } = this.props;
    selectBook(activeBookId + 1);
  };

  goToPreviousBook = () => {
    const { selectBook, activeBookId } = this.props;
    selectBook(activeBookId - 1);
  };

  render() {
    const { activeBookId, activeBook, hideModal, loading, setLoading } = this.props;
    return (
      <div>
        {!activeBook.title ? <Loading /> : (
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
            goPrevious={activeBookId !== 0 ? this.goToPreviousBook : () => {window.alert('There is no Previous to this book, man. Go forward instead')}}
          />
        )}
      </div>
    );
  }
}

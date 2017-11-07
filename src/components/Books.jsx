import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './common/Icon';

import BookModalContainer from '../containers/BookModalContainer';
import FooterContainer from '../containers/FooterContainer';

export default class Books extends Component {
  static propTypes = {
    showBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickIcon: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
  };

  state = {
    modal: false,
  };

  hideModal = () => {
    this.setState(({
      modal: false,
    }));
  }

  renderModal = (event, id) => {
    event.preventDefault();
    this.props.selectBook(id);
    this.setState(({
      modal: true,
    }));
  }

  renderBooks = (config) => {
    let markup;

    if (config.book.imageLinks) {
      markup = (<li key={config.book.googleVolumeId} data={config.book.googleVolumeId}>
        <a href="" onClick={event => this.renderModal(event, config.book.googleVolumeId)} >
          <img src={config.book.imageLinks.thumbnail} alt="whateva" />
        </a>
        <Icon icon={config.icon} onClick={event => config.onClickIcon(event)} />
      </li>);
    } else {
      markup = (<li id="book--no-image" key={config.book.googleVolumeId}>
        <div className="book__no-image">
          <a href="" onClick={event => this.renderModal(event, config.book.googleVolumeId)}>
            <span>Image Not Available</span>
            <span>Page Count: {config.book.pageCount}</span>
            <span>Title: {config.book.title}</span>
            <Icon icon={config.icon} onClick={event => config.onClickIcon(event)} />
          </a>
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    // returns an array of HTML <li> markup
    // Books takes param bookModal that is passed to BookModal, then onto Modal and InsideModal
    const { onClickIcon, totalSearched, books, showBooks, searchedBooks, icon, activeBook } = this.props;
    const { modal } = this.state;
    return (
      <div className="books">
        {modal && <BookModalContainer hideModal={this.hideModal} activeBook={activeBook} showBooks={showBooks} onClickIcon={onClickIcon} />}
        <ul className="books__container">
          {showBooks.map((book) => {
            const config = { book, onClickIcon, icon };
            return this.renderBooks(config);
          })}
        </ul>
      </div>
    );
  }
}

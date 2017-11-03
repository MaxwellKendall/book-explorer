import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './common/Icon';

import BookModalContainer from '../containers/BookModalContainer';
import FooterContainer from '../containers/FooterContainer';

export default class Books extends Component {
  static propTypes = {
    showBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickIcon: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    selectBook: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
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
      markup = (<li key={config.index} value={config.book.id}>
        <Icon icon={config.icon} onClick={event => config.onClickIcon(event)} />
        <a href="" onClick={event => this.renderModal(event, config.book.id)} >
          <img src={config.book.imageLinks.thumbnail} alt="whateva" />
        </a>
      </li>);
    } else {
      markup = (<li id="book--no-image" key={config.index}>
        <Icon icon={config.icon} onClick={event => config.onClickIcon(event)} />
        <div className="book__no-image">
          <a href="" onClick={event => this.renderModal(event, config.book.id)}>
            <span>Image Not Available</span>
            <span>Page Count: {config.book.pageCount}</span>
            <span>Title: {config.book.title}</span>
          </a>
        </div>
      </li>);
    }

    return markup;
  }

  render() {
    // returns an array of HTML <li> markup
    const { onClickImage, onClickIcon, books, showBooks, searchedBooks, icon } = this.props;
    const { modal } = this.state;
    return (
      <div className="books">
        {modal && <BookModalContainer hideModal={this.hideModal} />}
        <ul className="books__container">
          {showBooks.map((book, index) => {
            const config = { book, index, onClickIcon, icon };
            return this.renderBooks(config);
          })}
        </ul>
        {searchedBooks || books ? <FooterContainer /> : null}
      </div>
    );
  }
}

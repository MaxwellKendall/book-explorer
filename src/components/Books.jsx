import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './common/Icon';

export default class Books extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickImage: PropTypes.func.isRequired,
    onClickIcon: PropTypes.func.isRequired,
  }

  renderBooks = (config) => {
    let markup;

    if (config.book.imageLinks) {
      markup = (<li key={config.index} value={config.book.id}>
        <Icon icon="plus-circle" onClick={event => config.onClickIcon(event)} />
        <a href="" onClick={event => config.onClickImage(event, config.book.id)} >
          <img src={config.book.imageLinks.thumbnail} alt="whateva" />
        </a>
      </li>);
    } else {
      markup = (<li key={config.index}>
        <span>Sorry, no Image available!</span>
        <span>Page Count: {config.book.pageCount}</span>
        <span>Title: {config.book.title}</span>
      </li>);
    }

    return markup;
  }

  render() {
    // returns an array of HTML <li> markup
    const { onClickImage, onClickIcon, books } = this.props;

    return (
      <ul className="books">
        {books.map((book, index) => {
          const config = { book, index, onClickImage, onClickIcon };
          return this.renderBooks(config);
        })}
      </ul>
    );
  }
}

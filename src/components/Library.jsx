import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../utils/utils';

export default class Library extends Component {
  static propTypes = {
  }

  state = {
  };

  renderBooks = () => {
    const { books } = this.props;
    return books.map((book, index) => {
      const config = {
        book,
        index,
        onClickImage: () => console.log('image clicked'),
        onClickIcon: () => console.log('icon clicked'),
      };
      return utils.renderBookImage(config);
    });
  }

  render() {
    return (
      <div className="library-container">
        <h1>My Library</h1>
        <ul id="book-gallery">
          {this.renderBooks()}
        </ul>
      </div>
    );
  }
}

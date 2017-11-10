import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BooksContainer from '../containers/BooksContainer';
import FooterContainer from '../containers/FooterContainer';

export default class LibraryBooks extends Component {
  static propTypes = {
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    libraryBooks: [{}],
    activeLibraryBook: {},
  }

  state = {};

  render() {
    const { libraryBooks } = this.props;
    return (
      <div className="library-container">
        {libraryBooks &&
          <BooksContainer showBooks={{ books: libraryBooks, library: true }} />}
        {libraryBooks.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

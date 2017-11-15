import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class LibraryBooks extends Component {
  static propTypes = {
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
    activeLibraryBook: PropTypes.object,
  }

  static defaultProps = {
    libraryBooks: [{}],
    activeLibraryBook: {},
  }

  state = {};

  render() {
    const { libraryBooks, activeLibraryBook, loading, modal } = this.props;
    return (
      <div className="library-container">
        {loading && !modal && <Loading />}
        <Books
          books={libraryBooks}
          activeBook={activeLibraryBook}
          library={!false}
        />
        {libraryBooks.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

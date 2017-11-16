import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class LibraryBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.object.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeLibraryBook: PropTypes.object.isRequired,
  }

  state = {};

  render() {
    const { libraryBooks, activeLibraryBook, loading, modal } = this.props;
    return (
      <div className="library-container">
        {loading && !modal && <Loading />}
        <Books books={libraryBooks} activeBook={activeLibraryBook} />
        {libraryBooks.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

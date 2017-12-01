import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class LibraryBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.bool.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    libraryBooks: [{}],
    totalSearched: 0,
  }

  render() {
    const { libraryBooks, modal, loading } = this.props;
    return (
      <div className="library-container">
        {loading && !modal && <Loading />}
        <Books books={libraryBooks} />
        {libraryBooks.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

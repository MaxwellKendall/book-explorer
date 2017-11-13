import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Books from './Books';
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
          <Books books={{ list: libraryBooks, library: true }} />}
        {libraryBooks.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

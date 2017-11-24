import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import Notification from './common/Notification';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class LibraryBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.bool.isRequired,
    libraryBooks: PropTypes.arrayOf(PropTypes.object),
    notification: PropTypes.object.isRequired,
  }

  static defaultProps = {
    libraryBooks: [{}],
    totalSearched: 0,
  }

  render() {
    const { notification, libraryBooks, modal, loading } = this.props;
    return (
      <div className="library-container">
        {loading && !modal && <Loading />}
        {notification.show && <Notification
          classNames="notification__deleted"
          icon="minus"
          message={`${notification.info.title} was delted from your library, homie`}
        />}
        <Books books={libraryBooks} />
        {libraryBooks.length > 40 && <FooterContainer />}
      </div>
    );
  }
}

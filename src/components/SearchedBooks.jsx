import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import Notification from './common/Notification';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    notification: PropTypes.bool.isRequired,
    searchedBooks: PropTypes.arrayOf(PropTypes.object),
    totalSearched: PropTypes.number,
  }

  static defaultProps = {
    searchedBooks: [{}],
    totalSearched: 0,
  }

  renderBooks = () => {
    const { loading, modal, searchedBooks, error } = this.props;
    let markup;

    if (!loading && !modal && !error) {
      markup = <Books books={searchedBooks} />;
    } else if (loading && modal && !error) {
      markup = <Books books={searchedBooks} />;
    } else if (!loading && modal && !error) {
      markup = <Books books={searchedBooks} />;
    } else if (loading && !modal) {
      markup = <Loading />;
    } else if (error && !loading && !modal) {
      markup = (<Notification
        classNames="error"
        icon="exclamation-circle"
        message="No Items Returned for your search. Please try again."
      />);
    }

    return markup;
  }

  render() {
    const { loading, notification, searchedBooks, totalSearched, modal } = this.props;
    return (
      <div className="searched-books__container">
        {notification.show && <Notification
          classNames="notification__added"
          icon="check"
          message={`${notification.info.title} was added to your library, homie`}
        />}
        {searchedBooks ? this.renderBooks() : null}
        {totalSearched > 40 && !modal && !loading && <FooterContainer />}
      </div>
    );
  }
}

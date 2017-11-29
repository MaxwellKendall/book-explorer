import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import * as notification from './common/Notification';
import Icon from './common/Icon';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
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
      // markup = notification.showNotification({
      //   classes: 'error',
      //   icon: 'exclamation-circle',
      //   message: 'blabhalbalblablablablalbalba',
      // });
      markup = (
        <div className="error">
          <Icon className="exclamation-circle" />
          <h2>No items returned for your search. Please try again.</h2>
        </div>
      );
    }

    return markup;
  }

  render() {
    const { loading, searchedBooks, totalSearched } = this.props;
    return (
      <div className="searched-books__container">
        {searchedBooks ? this.renderBooks() : null}
        {totalSearched > 40 && !loading && <FooterContainer />}
      </div>
    );
  }
}

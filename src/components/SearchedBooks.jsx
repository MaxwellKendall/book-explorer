import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

export default class SearchedBooks extends Component {
  static propTypes = {
    searchedBooks: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.object,
    totalSearched: PropTypes.number,
  }

  static defaultProps = {
    searchedBooks: [{}],
    activeSearchedBook: {},
    modal: {},
    totalSearched: 0,
  }

  render() {
    const { searchedBooks, totalSearched, loading, modal } = this.props;
    return (
      <div className="searched-books__container">
        {loading && !modal && <Loading />}
        <Books books={{ list: searchedBooks, library: false }} />
        {totalSearched > 40 && <FooterContainer />}
      </div>
    );
  }
}

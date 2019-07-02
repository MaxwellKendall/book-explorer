import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Loading from './common/Loading';

import Books from './Books';
import FooterContainer from '../containers/FooterContainer';

const testApi = 'http://localhost:3000/test/';

/* eslint-disable react/prefer-stateless-function */
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
  componentDidMount() {
    console.log('componentDidMount');
    return axios.get(testApi)
      .then(data => console.log(data))
      .catch(err => console.log(err));
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import FooterContainer from '../containers/FooterContainer';

export default class BookGallery extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    totalItems: PropTypes.number.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { getSearchedBooks, location } = this.props;
    getSearchedBooks(location.pathname.substr(1));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.getSearchedBooks(nextProps.location.pathname.substr(1));
    }
  }

  render() {
    const { loading, totalItems } = this.props;
    return (
      <div className="book-gallery-container">
        {loading && <Loading />}
        {!loading && this.props.children}
        {totalItems > 40 && <FooterContainer />}
      </div>
    );
  }
}

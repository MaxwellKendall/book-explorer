import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
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
    searchedBooks: [],
    totalSearched: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading || this.props.error !== nextProps.error) {
      this.renderBooks();
    }
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
    const { loading, totalSearched } = this.props; // ES6 Object Destructuring
    return (
      <div className="searched-books__container">
        {this.renderBooks()}
        {totalSearched > 40 && !loading && <FooterContainer />}
      </div>
    );
  }
}

/**
 * I. Render: Line 48
 *   React method that returns JSX
 *     - should only have one return statement
 *     - if necessary, use {} (hereafter, {} inside render(){ return } will be referred to as 'interpolation') to invoke methods that
 *     return JSX, use conditional rendering, or refer to variables
 */

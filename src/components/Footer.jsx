import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  static propTypes = {
    bookIndex: PropTypes.number.isRequired,
    setBookIndex: PropTypes.func.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
  };

goNext = () => {
  const { bookIndex, setBookIndex, getSearchedBooks, searchTerm } = this.props;
  const newIndex = bookIndex + 40;
  setBookIndex(newIndex);
  getSearchedBooks(searchTerm, 40, newIndex);
}

goPrevious = () => {
  const { bookIndex, setBookIndex, getSearchedBooks, searchTerm } = this.props;
  const newIndex = bookIndex !== 1 ? bookIndex - 40 : 1;
  setBookIndex(newIndex);
  getSearchedBooks(searchTerm, 40, newIndex);
}

renderPagination = () => {
  const { setBookIndex, bookIndex } = this.props;
  const pagination = (
    <ul className="footer__container">
      <li>
        <a href="" onClick={this.goPrevious}>Previous</a>
      </li>
      <li>
        <a href="" onClick={this.goNext}>Next</a>
      </li>
    </ul>
  );
  return pagination;
}

render() {
  return (
    <div className="footer">
      {this.renderPagination()}
    </div>
  );
}
}

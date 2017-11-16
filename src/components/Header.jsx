import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static propTypes = {
    getSearchedBooks: PropTypes.func.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  makeAPICall = () => {
    this.props.getSearchedBooks(this.state.searchTerm);
    this.props.setSearchTerm(this.state.searchTerm);
  }

  handleChange = (event) => {
    event.persist();
    this.setState(prevState => ({ ...prevState, searchTerm: event.target.value }));
  }

  render() {
    const { searchTerm } = this.state;
    const path = window.location.href.match('library');
    return (
      <div className="header">
        {path === 'library' ? <h1>My Library</h1> : <h1>Google Books</h1>}
        <div className="search_bar__container">
          <input
            id="searchBar"
            value={searchTerm}
            onChange={this.handleChange}
            type="text"
            placeholder="Search by Title or Author"
          />
          <Link className="search" to="/book-explorer" onClick={this.makeAPICall}>Search</Link>
          <Link to="/book-explorer/library" className="library">
            My Library
          </Link>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static propTypes = {
    activeUser: PropTypes.object.isRequired,
    error: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  makeAPICall = () => {
    const { getSearchedBooks, setSearchTerm, setError, error } = this.props;
    if (error) setError(false);
    getSearchedBooks(this.state.searchTerm);
    setSearchTerm(this.state.searchTerm);
  }

  handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      this.makeAPICall();
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState(prevState => ({ ...prevState, searchTerm: event.target.value }));
  }

  render() {
    const { searchTerm } = this.state;
    const { location } = this.props;
    return (
      <div className="header">
        {location === '/book-explorer/library' ? <h1>My Library</h1> : <h1>Google Books</h1>}
        <div className="search_bar__container">
          <input
            id="searchBar"
            value={searchTerm}
            onChange={this.handleChange}
            type="text"
            placeholder="Search by Title or Author"
            onKeyPress={this.handlePressEnter}
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

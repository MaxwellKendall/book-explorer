import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as utils from '../utils/utils';

export default class Header extends Component {
  // This is an example of a controlled component:
  //   (a) the text input value is defined by the state
  //   (b) a change handler is attached to the input in order to:
  //     (1) update the state which consequently
  //     (2) updates the inputs value
  // Controlled components in React are considered a best practice in order to:
  //   (i) maintain the principle of React State being "The Single Source of Truth" for the application
  //   (ii) more easily enfore validation styles on a form by referring to state
  // Source: https://reactjs.org/docs/uncontrolled-components.html and https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/

  static propTypes = {
    getSearchedBooks: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  makeAPICall = () => {
    event.preventDefault();
    this.props.getSearchedBooks(this.state.searchTerm);
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
        <div className="search_bar">
          <input
            id="searchBox"
            value={searchTerm}
            onChange={this.handleChange}
            type="text"
            placeholder="Search for a Book"
          />
          <Link className="search" to="/" onClick={this.makeAPICall}>Search</Link>
          <Link to="/library" className="library" onClick={utils.preventDefault}>
            My Library
          </Link>
        </div>
      </div>
    );
  }
}

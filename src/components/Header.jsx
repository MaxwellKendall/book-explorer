import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  state = {
    searchTerm: '',
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="header">
        <h1>My Books</h1>
        <div className="search_bar">
          <input
            id="searchBox"
            value={searchTerm}
            onChange={event => this.setState(({ searchTerm: event.target.value }))}
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search for a Book"
          />
          <Link
            to={`/${searchTerm.toLowerCase()}`}
            className="btn btn-outline-success my-2 my-sm-0 search"
            onClick={() => event.preventDefault()}
          >
            Search
          </Link>
          <Link
            to="/library/mybooks"
            className="btn btn-outline-success my-2 my-sm-0 library"
            onClick={() => event.preventDefault()}
          >
            My Library
          </Link>
        </div>
      </div>
    );
  }
}

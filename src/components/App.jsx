import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import BookGalleryContainer from '../containers/BookGalleryContainer';
import LibraryContainer from '../containers/LibraryContainer';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <HeaderContainer />
          <Route exact path="/:searchTerm" component={BookGalleryContainer} />
          <Route exact path="/library/mybooks" component={LibraryContainer} />
        </div>
      </Router>
    );
  }
}

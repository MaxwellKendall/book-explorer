import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import BookGalleryContainer from '../containers/BookGalleryContainer';
import LibraryContainer from '../containers/LibraryContainer';

// TODO: see packagemanager setup w/ redux integration itno react router

const App = () => (
  <Router>
    <div className="main">
      <Route path="/" component={Header} />
      <Route exact path="/:searchTerm" component={BookGalleryContainer} />
      <Route exact path="/library/mybooks" component={LibraryContainer} />
    </div>
  </Router>
);

export default App;

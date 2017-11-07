import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import BookGalleryContainer from '../containers/BookGalleryContainer';
import LibraryContainer from '../containers/LibraryContainer';

const App = () => (
  <Router>
    <div className="main">
      <Header />
      <Route exact path="/:searchTerm" component={BookGalleryContainer} />
      <Route exact path="/library/mybooks" component={LibraryContainer} />
    </div>
  </Router>
);

export default App;

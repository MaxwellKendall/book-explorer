import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const App = () => (
  <Router>
    <div className="main">
      <HeaderContainer />
      <ModalContainer />
      <Route exact path="/" component={SearchedBooksContainer} />
      <Route exact path="/library" component={LibraryBooksContainer} />
    </div>
  </Router>
);

export default App;

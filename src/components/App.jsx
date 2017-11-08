import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const App = () => (
  <Router>
    <div className="main">
      <HeaderContainer />
      <Route path="/" component={SearchedBooksContainer} />
      <Route exact path="/library/mybooks" component={LibraryContainer} />
    </div>
  </Router>
);

export default App;

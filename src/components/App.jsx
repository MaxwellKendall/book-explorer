import React from 'react';
<<<<<<< HEAD
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
=======
import { Router, Route } from 'react-router-dom';
>>>>>>> 5d6c8c0dbce842f6ce1a9d32b361e3bff73f5dcc
import createBrowserHistory from 'history/createBrowserHistory';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const customHistory = createBrowserHistory();

<<<<<<< HEAD
const App = () => {
  return (
    <Router history={customHistory}>
      <div className="main">
        <HeaderContainer />
        <ModalContainer />
        <Route exact path="/library" component={LibraryBooksContainer} />
        <Route exact path="/" component={SearchedBooksContainer} />
      </div>
    </Router>
  );
};
=======
const App = () => (
  <Router history={history}>
    <div className="main">
      <ModalContainer />
      <HeaderContainer />
      <Route exact path="/book-explorer/library" component={LibraryBooksContainer} />
      <Route exact path="/book-explorer" component={SearchedBooksContainer} />
    </div>
  </Router>
);
>>>>>>> 5d6c8c0dbce842f6ce1a9d32b361e3bff73f5dcc

export default App;

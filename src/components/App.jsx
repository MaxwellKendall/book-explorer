import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const history = createBrowserHistory();

// TODO: Add ReduxRouter to put location in state (see packman)

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

export default App;

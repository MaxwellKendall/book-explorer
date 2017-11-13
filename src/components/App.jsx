import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div className="main">
      <ModalContainer />
      <Route path="/Book-Explorer" component={HeaderContainer} />
      <Route exact path="/Book-Explorer/library" component={LibraryBooksContainer} />
      <Route exact path="/Book-Explorer" component={SearchedBooksContainer} />
    </div>
  </Router>
);

export default App;

import React from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const customHistory = createBrowserHistory();

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

export default App;

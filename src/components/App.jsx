import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <div className="main">
        <ModalContainer />
        <Route path="/" component={HeaderContainer} />
        <Route exact path="/library" component={LibraryBooksContainer} />
        <Route exact path="/" component={SearchedBooksContainer} />
      </div>
    </Router>
  );
}

export default App;

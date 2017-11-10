import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HeaderContainer from '../containers/HeaderContainer';
import ModalContainer from '../containers/ModalContainer';

import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const history = createBrowserHistory();
const prodRoute = 'https://maxwellkendall.github.io/Book-Explorer';
// const localRoute = '';

const App = () => {
  return (
    <Router history={history}>
      <div className="main">
        <ModalContainer />
        <Route path={`${prodRoute}`} component={HeaderContainer} />
        <Route exact path={`${prodRoute}/library`} component={LibraryBooksContainer} />
        <Route exact path={`${prodRoute}/`} component={SearchedBooksContainer} />
      </div>
    </Router>
  );
}

export default App;

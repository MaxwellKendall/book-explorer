import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
=======
import { Route } from 'react-router-dom';
>>>>>>> 38f09a3567faf8dd34574d491e31c0d33e4f0a6b

import HeaderContainer from '../containers/HeaderContainer';
import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';


const App = () => (
  <div className="main">
    <HeaderContainer />
    <Route exact path="/book-explorer/library" component={LibraryBooksContainer} />
    <Route exact path="/book-explorer" component={SearchedBooksContainer} />
  </div>
);

export default App;

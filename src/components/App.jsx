import React from 'react';
import { Route } from 'react-router-dom';

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

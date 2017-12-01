import React from 'react';
import { Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

/*
 * This is a stateless functional component (SFC)
 * If a component has no use for state, you can simply make it a function that returns some UI
 * rather than a JS Class
 * reference: https://tylermcginnis.com/functional-components-vs-stateless-functional-components-vs-stateless-components/
*/

const App = () => (
  // SFC expose props @ props.xyz !this.props.xyz
  <div className="main">
    {/* Common error I have is accidentally rendering the component instead of the container */}
    <HeaderContainer />
    <Route exact path="/book-explorer/library" component={LibraryBooksContainer} />
    <Route exact path="/book-explorer" component={SearchedBooksContainer} />
  </div>
);

export default App;

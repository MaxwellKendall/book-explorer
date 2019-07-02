import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';
import PrivateRouteContainer from '../containers/PrivateRouteContainer';
import HeaderContainer from '../containers/HeaderContainer';
import LibraryBooksContainer from '../containers/LibraryBooksContainer';
import SearchedBooksContainer from '../containers/SearchedBooksContainer';

const App = () => (
  <div className="main">
    <HeaderContainer />
    {/* <Route exact path="/login" component={Login} /> */}
    {/* <PrivateRouteContainer path="/book-explorer/library" component={LibraryBooksContainer} />
    <PrivateRouteContainer path="/book-explorer" component={SearchedBooksContainer} /> */}
    <Route exact path="/book-explorer/library" component={LibraryBooksContainer} />
    <Route exact path="/book-explorer" component={SearchedBooksContainer} />
  </div>
);

export default App;

/**
 * I. App: Line 8
 *   App is a Stateless Functional Component
 *     - these make props avaialbe @ props.xyz instead of a stateful component which would be this.props.xyz
 * II. HeaderContainer: Line 10
 *   Common error:
 *   - rendering the <Component /> instead of <ComponentContainer/>
 */

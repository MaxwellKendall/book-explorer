import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import books from './books';
import ui from './ui';

/**
 * rootReducer:
 *   - creates initial state
 *   - key is state
 *   - Value is reducer that returns state
 */
const rootReducer = combineReducers({
  ui,
  books,
  router: routerReducer, // from reduxRouter
});

export default rootReducer;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import books from './books';
import ui from './ui';

const rootReducer = combineReducers({
  // creates initial state;
  // key is state.
  // Value is reducer that returns state
  ui,
  books,
  router: routerReducer,
});

export default rootReducer;

import thunk from 'redux-thunk';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import configureHistory from '../history/configureHistory';
import rootReducer from '../reducers';

const history = configureHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routingMiddleware = routerMiddleware(history);
const middleware = [thunk, routingMiddleware];

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index'); // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;

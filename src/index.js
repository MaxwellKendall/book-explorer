import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers/index';

// require('./less/index.less');
require('./less/output.css');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    {/* TODO: Add Modal Parent or nest in app */}
    <App />
  </Provider>,
  document.querySelector('.container'),
);

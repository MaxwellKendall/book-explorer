import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import configureStore from './store/configureStore';
import configureHistory from './history/configureHistory';

import App from './components/App';

// require('./scss/index.scss');
require('./output.css');

const store = configureStore();
const history = configureHistory();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('container'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App); });
}

/**
 * I. Provider: Line 20
 *  Redux component that exposes children to store
 * II. AppContainer: Line 22
 *   Used for enabling react-hot-loader
 */

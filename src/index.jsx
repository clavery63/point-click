import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from './middleware.js';
import initialState from './initialState.js';
import reducers from './reducers.js';
import App from './app.jsx';

const store = createStore(reducers, initialState, applyMiddleware(logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

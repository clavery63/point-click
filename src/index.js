import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { createEpicMiddleware } from 'redux-observable';

import * as serviceWorker from './serviceWorker';
import rootEpic from './store/epics/rootEpic';
import rootReducer from './store/reducers/rootReducer';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  fillColor: 'blue',
  width: 50
};

const store = createStore(rootReducer, initialState, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

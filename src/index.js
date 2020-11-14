import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable';

import * as serviceWorker from './serviceWorker';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import textMiddleware from './store/middleware/textMiddleware';

import './index.css';
import App from './ui/App';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  menuOption: null,
  nextText: null,
  text: null,
};

const store = createStore(rootReducer, initialState, applyMiddleware(epicMiddleware, textMiddleware));
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

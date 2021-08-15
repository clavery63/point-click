import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import Router from './Router';

const AdminRoot = () => {
  const epicMiddleware = createEpicMiddleware();

  const initialState = {};

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(epicMiddleware)
  ));

  epicMiddleware.run(rootEpic);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default AdminRoot;

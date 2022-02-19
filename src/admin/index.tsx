import React from 'react';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { useParams } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import Router from './Router';

const AdminRoot = () => {
  const { gameName } = useParams<{ gameName: string}>();
  const epicMiddleware = createEpicMiddleware();

  const initialState = {
    gameName,
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        // TODO: I bet these images can be moved to a selector without too much
        // trouble
        ignoredActionPaths: ['payload.images', 'payload.file'],
        ignoredPaths: ['gameState.images', 'previewState.images'],
      },
    }).concat(epicMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  epicMiddleware.run(rootEpic);

  return (
    <Provider store={store}>
      <Router gameName={gameName} />
    </Provider>
  );
};

export default AdminRoot;

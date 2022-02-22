import React from 'react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'admin/store/reducers/rootReducer';
import rootEpic from 'admin/store/epics/root';
import { createEpicMiddleware } from 'redux-observable';
import { setGameName } from './store/reducers/gameNameReducer';
import Router from './Router';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
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
});
epicMiddleware.run(rootEpic);

const AdminRoot = () => {
  const { gameName } = useParams<{ gameName: string}>();

  store.dispatch(setGameName(gameName));

  return (
    <Provider store={store}>
      <Router gameName={gameName} />
    </Provider>
  );
};

export default AdminRoot;

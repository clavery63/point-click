import React, { useEffect } from 'react';
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
      ignoredActionPaths: ['payload.images', 'payload.img'],
      ignoredPaths: ['images', 'previewState.images'],
    },
  }).concat(epicMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
epicMiddleware.run(rootEpic);

const AdminRoot = () => {
  const { gameName } = useParams<{ gameName: string}>();

  useEffect(() => {
    document.title = 'Admin';
    store.dispatch(setGameName(gameName));
  }, []);

  return (
    <Provider store={store}>
      <Router gameName={gameName} />
    </Provider>
  );
};

export default AdminRoot;

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import effectsMiddleware from './store/middleware/effectsMiddleware';
import GameContainer from './GameContainer';

const GameRoot = React.memo(({ gameName, state }) => {
  // TODO: universal assets like this should live somewhere else
  const audioAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/audio`;

  const epicMiddleware = createEpicMiddleware();

  const initialState = {
    loading: true,
    gameName,
    ...state
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(epicMiddleware, effectsMiddleware)
  ));

  epicMiddleware.run(rootEpic);

  return (
    <Provider store={store}>
      <audio className='music-player' loop />
      <audio className='sfx-player' src={`${audioAssetsRoot}/transition.mp3`} />
      <GameContainer />
    </Provider>
  );
});

export default GameRoot;

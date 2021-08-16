import React, { useRef, useEffect, useState } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import effectsMiddleware from './store/middleware/effectsMiddleware';
import GameContainer from './GameContainer';
import { gameContainer } from './Game.module.css'; 

// TODO: universal assets like this should live somewhere else
const audioAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/audio`;

const GameRoot = React.memo(({ gameName, state }) => {
  const containerRef = useRef(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const epicMiddleware = createEpicMiddleware();
  
    const initialState = {
      loading: true,
      gameName,
      ...state
    };
  
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    setStore(createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(epicMiddleware, effectsMiddleware)
    )));
  
    epicMiddleware.run(rootEpic);
  }, [gameName, state]);

  return (
    <div className={gameContainer} ref={containerRef}>
      {store && (
        // This seems potentially relevant for our use-case, especially if
        // we decide to start using hooks for the game's redux instance:
        // https://react-redux.js.org/api/hooks#custom-context
        <Provider store={store}>
          <audio className='music-player' loop />
          <audio className='sfx-player' src={`${audioAssetsRoot}/transition.mp3`} />
            <GameContainer parentRef={containerRef} />
        </Provider>
      )}
    </div>
  );
});

export default GameRoot;

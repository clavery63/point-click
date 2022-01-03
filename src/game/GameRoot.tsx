import React, { useRef, useMemo } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import effectsMiddleware from './store/middleware/effectsMiddleware';
import GameContainer from './GameContainer';
import { GameState } from './store/types';
import defaultState from './store/defaultState';

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
};

// TODO: universal assets like this should live somewhere else
const audioAssetsRoot = `${process.env.REACT_APP_ASSETS_BASE}/test-game/audio`;

type Props = {
  gameName: string,
  state: GameState
};

const GameRoot = React.memo(({ gameName, state }: Props) => {
  const containerRef = useRef(null);

  const store = useMemo(() => {
    const epicMiddleware = createEpicMiddleware();
  
    const initialState = {
      ...defaultState,
      gameName,
      ...state
    };
  
    const composeEnhancers = compose;
    const newStore = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(epicMiddleware, effectsMiddleware)
    ));
  
    epicMiddleware.run(rootEpic);

    return newStore;
  }, [gameName, state]);

  return (
    <div style={containerStyles} ref={containerRef}>
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
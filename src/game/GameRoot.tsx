import React, { useEffect } from 'react';
import {
  createStore, applyMiddleware, compose,
} from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './store/epics/root';
import rootReducer from './store/reducers/rootReducer';
import effectsMiddleware from './store/middleware/effectsMiddleware';
import GameContainer from './GameContainer';
import { GameState, GameStoreState } from './store/types';
import defaultState from './store/defaultState';
import { AllActions } from './store/epics/types';

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
};

type Props = {
  gameName: string;
  state?: GameState;
};

const epicMiddleware = createEpicMiddleware<AllActions, AllActions, GameStoreState>();

// Uncomment this if you are working on the game (as opposed to admin)
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;
const store = createStore(rootReducer, defaultState, composeEnhancers(
  applyMiddleware(epicMiddleware, effectsMiddleware),
));

epicMiddleware.run(rootEpic);

const GameRoot = React.memo(({ gameName, state }: Props) => {
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (state) {
      // Hydrate from admin
      store.dispatch({ type: 'SET_WORLD_STATE', payload: state.worldState });
      store.dispatch({ type: 'SET_PLAYER_STATE', payload: state.playerState });
      store.dispatch({ type: 'SET_VERBS', payload: state.config.verbs });
      store.dispatch({ type: 'SET_FLAGS', payload: state.flags });
      store.dispatch({ type: 'SET_MENU', payload: 'NONE' });
      // TODO: Feels like playing the first room's music should be a little more automatic
      // Also, For some reason SET_GAME_NAME has to happen after SET_MENU...
      store.dispatch({ type: 'SET_GAME_NAME', payload: gameName });
      store.dispatch({
        type: 'PLAY_MUSIC',
        payload: {
          fileName: state.worldState.rooms[state.playerState.room].music,
        },
      });
    } else {
      store.dispatch({
        type: 'SET_GAME_NAME',
        payload: gameName,
      });
    }
  }, []);

  return (
    <div style={containerStyles} ref={containerRef}>
      {store && (
        // This seems potentially relevant for our use-case, especially if
        // we decide to start using hooks for the game's redux instance:
        // https://react-redux.js.org/api/hooks#custom-context
        <Provider store={store}>
          <audio className="music-player" loop />
          <audio className="sfx-player" />
          <GameContainer parentRef={containerRef} />
        </Provider>
      )}
    </div>
  );
});

export default GameRoot;

import React, {
  useEffect, useState,
} from 'react';
import {
  createStore, applyMiddleware, compose, Store,
} from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './store/epics/root';
import rootReducer, { ReducerActions } from './store/reducers/rootReducer';
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

const GameRoot = React.memo(({ gameName, state }: Props) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const [store, setStore] = useState<Store<GameStoreState, ReducerActions> | null>(null);

  useEffect(() => {
    if (!store) {
      const epicMiddleware = createEpicMiddleware<AllActions, AllActions, GameStoreState>();

      const initialState = {
        ...defaultState,
        gameName,
        ...state,
      };

      const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      const newStore = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(epicMiddleware, effectsMiddleware),
      ));

      epicMiddleware.run(rootEpic);

      setStore(newStore);
    }
  }, [gameName, state]);

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

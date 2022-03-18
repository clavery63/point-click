import { Middleware } from 'redux';
import get from 'shared/util/get';
import { GameStoreState } from '../types';

const effectsMiddleware: Middleware<
  {},
  GameStoreState
> = store => next => action => {
  const result = next(action);
  const state = store.getState();
  const { transient, transition } = state;
  if (transient.nextText) {
    store.dispatch({ type: 'CLEAR_NEXT_TEXT' });
    store.dispatch({ type: 'RUN_TEXT', payload: transient.nextText });
  }
  if (transient.nextMusic.fileName) {
    store.dispatch({ type: 'CLEAR_NEXT_MUSIC' });
    store.dispatch({ type: 'PLAY_MUSIC', payload: transient.nextMusic });
  }
  if (get(transition, 'dest', null) !== null) {
    store.dispatch({ type: 'CLEAR_TRANSITION_DEST' });
    store.dispatch({ type: 'RUN_TRANSITION', payload: transition });
  }
  return result;
};

export default effectsMiddleware;

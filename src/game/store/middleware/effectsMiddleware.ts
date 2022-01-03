import { Middleware } from 'redux';
import get from 'shared/util/get';
import { GameStoreState } from '../types';

const effectsMiddleware: Middleware<
  {},
  GameStoreState
> = store => next => action => {
  const result = next(action);
  const state = store.getState();
  const { nextText, transition } = state;
  if (nextText) {
    store.dispatch({ type: 'CLEAR_NEXT_TEXT' });
    store.dispatch({ type: 'RUN_TEXT', payload: nextText });
  }
  if (get(transition, 'dest', null) !== null) {
    store.dispatch({ type: 'CLEAR_TRANSITION_DEST' });
    store.dispatch({ type: 'RUN_TRANSITION', payload: transition });
  }
  return result;
};

export default effectsMiddleware;

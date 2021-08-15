import { get } from 'lodash';

const textMiddleware = store => next => action => {
  const result = next(action);
  const { nextText, transition } = store.getState();
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

export default textMiddleware;

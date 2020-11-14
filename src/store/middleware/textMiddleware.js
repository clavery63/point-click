const textMiddleware = store => next => action => {
  const result = next(action);
  const { nextText } = store.getState();
  if (nextText) {
    store.dispatch({ type: 'CLEAR_NEXT_TEXT' });
    store.dispatch({ type: 'RUN_TEXT', payload: nextText });
  }
  return result;
};

export default textMiddleware;

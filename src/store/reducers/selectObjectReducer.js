import lookReducer from './verbReducers/lookReducer';
import openReducer from './verbReducers/openReducer';

const verbReducers = {
  MOVE: (state, object) => state,
  LOOK: lookReducer,
  OPEN: openReducer,
  USE: (state, object) => state,
  LEAVE: (state, object) => state,
  TAKE: (state, object) => state,
  CLOSE: (state, object) => state,
  HIT: (state, object) => state,
  SPEAK: (state, object) => state
};

const selectObjectReducer = (state, payload) => {
  const { gameState, playerState } = state;
  const { type, id } = payload;
  const object = { ...gameState[type][id], type, id };
  const item = gameState.items[playerState.using];
  const reducer = verbReducers[playerState.verb] || (() => state);
  return reducer(state, object, item);
};

export default selectObjectReducer;

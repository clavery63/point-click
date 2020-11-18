import lookReducer from './verbReducers/lookReducer';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';

const verbReducers = {
  MOVE: moveReducer,
  LOOK: lookReducer,
  OPEN: openReducer,
  USE: object => state => state,
  LEAVE: object => state => state,
  TAKE: object => state => state,
  CLOSE: object => state => state,
  HIT: object => state => state,
  SPEAK: object => state => state
};

const selectObjectReducer = payload => state => {
  const { gameState, playerState } = state;
  const { type, id } = payload;
  const object = { ...gameState[type][id], type, id };
  const item = gameState.items[playerState.using];
  const reducer = verbReducers[playerState.verb] || (() => state);
  return reducer(object, item)(state);
};

export default selectObjectReducer;

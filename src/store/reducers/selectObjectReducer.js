import lookReducer from './verbReducers/lookReducer';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import { keepState } from './utils';

const verbReducers = {
  MOVE: moveReducer,
  LOOK: lookReducer,
  OPEN: openReducer,
  USE: keepState,
  LEAVE: keepState,
  TAKE: takeReducer,
  CLOSE: keepState,
  HIT: keepState,
  SPEAK: keepState
};

const selectObjectReducer = payload => state => {
  const { gameState, playerState } = state;
  const { type, id } = payload;
  const object = { ...gameState[type][id], type, id };
  const item = gameState.items[playerState.using];
  const reducer = verbReducers[playerState.verb] || keepState;
  return reducer(object, item)(state);
};

export default selectObjectReducer;

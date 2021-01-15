import lookReducer from './verbReducers/lookReducer';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import useReducer from './verbReducers/useReducer';
import hitReducer from './verbReducers/hitReducer';
import speakReducer from './verbReducers/speakReducer';
import eatReducer from './verbReducers/eatReducer';
import { keepState } from './utils';

const verbReducers = {
  MOVE: moveReducer,
  LOOK: lookReducer,
  OPEN: openReducer,
  USE: useReducer,
  SMOKE: keepState,
  TAKE: takeReducer,
  EAT: eatReducer,
  HIT: hitReducer,
  SPEAK: speakReducer
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

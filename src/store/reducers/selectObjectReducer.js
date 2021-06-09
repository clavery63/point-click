import lookReducer from './verbReducers/lookReducer';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import useReducer from './verbReducers/useReducer';
import hitReducer from './verbReducers/hitReducer';
import speakReducer from './verbReducers/speakReducer';
import eatReducer from './verbReducers/eatReducer';
import smokeReducer from './verbReducers/smokeReducer';
import { keepState } from './utils';

const verbReducers = {
  MOVE: moveReducer,
  LOOK: lookReducer,
  OPEN: openReducer,
  USE: useReducer,
  SMOKE: smokeReducer,
  TAKE: takeReducer,
  EAT: eatReducer,
  HIT: hitReducer,
  SPEAK: speakReducer
};

const selectObjectReducer = (payload, playerState, gameState) => {
  const { type, id } = payload;
  const object = { ...gameState[type][id], type, id };
  const reducer = verbReducers[playerState.verb] || keepState;
  console.log(object, playerState, gameState.flags);
  return reducer(object, playerState, gameState.flags);
};

export default selectObjectReducer;

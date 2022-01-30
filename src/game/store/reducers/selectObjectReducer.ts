import { ParentReducer } from 'shared/util/types';
import lookReducer from './verbReducers/lookReducer';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import _useReducer from './verbReducers/useReducer';
import hitReducer from './verbReducers/hitReducer';
import speakReducer from './verbReducers/speakReducer';
import eatReducer from './verbReducers/eatReducer';
import smokeReducer from './verbReducers/smokeReducer';
import { keepState } from './utils';
import { ObjectType } from './rootReducer';
import { VerbIndex } from '../types';

const getReducer = (verb: VerbIndex) => ({
  MOVE: moveReducer,
  LOOK: lookReducer,
  OPEN: openReducer,
  USE: _useReducer,
  SMOKE: smokeReducer,
  TAKE: takeReducer,
  EAT: eatReducer,
  HIT: hitReducer,
  SPEAK: speakReducer,
}[verb]);

const selectObjectReducer: ParentReducer<
  ObjectType
> = (payload, playerState, worldState, flags) => {
  const { type, id } = payload;
  const object = worldState[type][id];
  const reducer = getReducer(playerState.verb) || keepState;
  return reducer(object, playerState, flags);
};

export default selectObjectReducer;

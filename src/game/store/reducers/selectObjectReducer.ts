import { ParentReducer } from 'shared/util/types';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import _useReducer from './verbReducers/useReducer';
import { keepState } from './utils';
import { VerbIndex, VerbConfig } from '../types';
import genericVerbReducer from './verbReducers/genericVerbReducer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getReducer = (verb: VerbIndex, verbs: VerbConfig[]) => ([
  moveReducer,
  genericVerbReducer(1, object => object.description),
  openReducer,
  _useReducer,
  genericVerbReducer(4, () => verbs[4].defaultText),
  takeReducer,
  genericVerbReducer(6, () => verbs[6].defaultText),
  genericVerbReducer(7, () => verbs[7].defaultText),
  genericVerbReducer(8, () => verbs[8].defaultText),
][verb]);

type GenericReducer = (t: 'doors' | 'entities') => ParentReducer<number>;
const selectObjectReducer: GenericReducer = entType => {
  return (id, playerState, worldState, flags, verbs) => {
    const object = worldState[entType][id];
    const reducer = getReducer(playerState.verb, verbs) || keepState;
    return reducer(object, playerState, flags);
  };
};

export const selectEntityReducer = selectObjectReducer('entities');
export const selectDoorReducer = selectObjectReducer('doors');

import { ParentReducer } from 'shared/util/types';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import _useReducer from './verbReducers/useReducer';
import { keepState } from './utils';
import { VerbIndex, VerbName } from '../types';
import genericVerbReducer from './verbReducers/genericVerbReducer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getReducer = (verb: VerbIndex, verbNames: VerbName[]) => ([
  moveReducer,
  genericVerbReducer(1, object => object.description),
  openReducer,
  _useReducer,
  genericVerbReducer(4, () => verbNames[4].defaultText),
  takeReducer,
  genericVerbReducer(6, () => verbNames[6].defaultText),
  genericVerbReducer(7, () => verbNames[7].defaultText),
  genericVerbReducer(8, () => verbNames[8].defaultText),
][verb]);

type GenericReducer = (t: 'doors' | 'entities') => ParentReducer<number>;
const selectObjectReducer: GenericReducer = entType => {
  return (id, playerState, worldState, flags, verbNames) => {
    const object = worldState[entType][id];
    const reducer = getReducer(playerState.verb, verbNames) || keepState;
    return reducer(object, playerState, flags);
  };
};

export const selectEntityReducer = selectObjectReducer('entities');
export const selectDoorReducer = selectObjectReducer('doors');

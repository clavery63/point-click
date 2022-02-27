import { ParentReducer } from 'shared/util/types';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import _useReducer from './verbReducers/useReducer';
import { keepState } from './utils';
import { VerbIndex } from '../types';
import genericVerbReducer from './verbReducers/genericVerbReducer';

const getReducer = (verb: VerbIndex) => ([
  moveReducer,
  genericVerbReducer(1, object => object.description),
  openReducer,
  _useReducer,
  genericVerbReducer(4, () => 'Smoking that would be ill-advised!'),
  takeReducer,
  genericVerbReducer(6, () => 'Don\'t eat that.'),
  genericVerbReducer(7, () => 'Ya blew it. That really hurt.'),
  genericVerbReducer(8, () => 'No response.'),
][verb]);

type GenericReducer = (t: 'doors' | 'entities') => ParentReducer<number>;
const selectObjectReducer: GenericReducer = entType => {
  return (id, playerState, worldState, flags) => {
    const object = worldState[entType][id];
    const reducer = getReducer(playerState.verb) || keepState;
    return reducer(object, playerState, flags);
  };
};

export const selectEntityReducer = selectObjectReducer('entities');
export const selectDoorReducer = selectObjectReducer('doors');

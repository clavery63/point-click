import { ParentReducer } from 'shared/util/types';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import _useReducer, { forfeitItemReducer } from './verbReducers/useReducer';
import { keepState, withText } from './utils';
import { VerbIndex, VerbConfig } from '../types';
import genericVerbReducer from './verbReducers/genericVerbReducer';

const getReducer = (verb: VerbIndex, verbs: VerbConfig[]) => ([
  // TODO: None of these behaviors should be hardcoded. Special behaviors like
  // MOVE and TAKE should be user-selected in the verb config. In a way,
  // defaultText is just another special behavior.
  genericVerbReducer(0, moveReducer),
  genericVerbReducer(1, object => withText(object.description)),
  genericVerbReducer(2, openReducer),
  genericVerbReducer(3, _useReducer, forfeitItemReducer),
  genericVerbReducer(4, () => withText(verbs[4].defaultText)),
  genericVerbReducer(5, takeReducer),
  genericVerbReducer(6, () => withText(verbs[6].defaultText)),
  genericVerbReducer(7, () => withText(verbs[7].defaultText)),
  genericVerbReducer(8, () => withText(verbs[8].defaultText)),
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

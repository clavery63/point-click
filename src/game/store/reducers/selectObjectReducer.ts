import { EntityReducer, ParentReducer } from 'shared/util/types';
import moveReducer from './verbReducers/moveReducer';
import openReducer from './verbReducers/openReducer';
import takeReducer from './verbReducers/takeReducer';
import _useReducer, { forfeitItemReducer } from './verbReducers/useReducer';
import { keepState, withText } from './utils';
import {
  VerbIndex, VerbConfig, Entity,
} from '../types';
import genericVerbReducer from './verbReducers/genericVerbReducer';

const fallbackLookup: { [key: string]: EntityReducer } = {
  MOVE: moveReducer,
  LOOK: (object: Entity) => withText(object.description),
  OPEN: openReducer,
  USE: _useReducer,
  TAKE: takeReducer,
};

const successLookup: { [key: string]: EntityReducer } = {
  USE: forfeitItemReducer,
};

const getReducer = (verb: VerbIndex, verbs: VerbConfig[]) => {
  const { defaultBehavior, defaultText } = verbs[verb];
  const fallbackBehavior = fallbackLookup[defaultBehavior] || (() => withText(defaultText));
  return genericVerbReducer(verb, fallbackBehavior, successLookup[defaultBehavior]);
};

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

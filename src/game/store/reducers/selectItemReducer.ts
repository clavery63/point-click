import { compose } from 'redux';
import { EntityReducer, ParentReducer } from 'shared/util/types';
import { Entity, VerbConfig, VerbIndex } from '../types';
import {
  setValue, updateValue, withText, keepState, filterValues,
} from './utils';
import genericVerbReducer from './verbReducers/genericVerbReducer';

const takeReducer: EntityReducer = (item, playerState) => {
  if (!playerState.examining) return keepState();
  return compose(
    filterValues(`worldState.entities[${playerState.examining}].contains`)(item.id),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(`Took the ${item.name}.`),
  );
};

export const useReducer: EntityReducer = ({ id }) => compose(
  // TODO NEXT: allow custom text here, for example with the bag:
  // "So you've decided to use your bag... What would you like to use it on?"
  // Also should be able to have custom default text:
  // eg: "That is not something you can do with your bag."
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id),
);

const lookReducer = (object: Entity) => withText(object.description);

const fallbackLookup: { [key: string]: EntityReducer } = {
  LOOK: lookReducer,
  USE: useReducer,
  TAKE: takeReducer,
};

type GetReducer = (verbIndex: VerbIndex, item: Entity, verbs: VerbConfig[]) => EntityReducer;
const getReducer: GetReducer = (verbIndex, item, verbs) => {
  const { defaultBehavior, defaultText } = verbs[verbIndex];
  const fallbackReducer = fallbackLookup[defaultBehavior] || (() => withText(defaultText));
  return genericVerbReducer(verbIndex, fallbackReducer);
};

const selectItemReducer: ParentReducer<number> = (id, playerState, worldState, _flags, verbs) => {
  const entity = worldState.entities[id];
  const reducer = getReducer(playerState.verb, entity, verbs);
  return reducer(entity, playerState, _flags);
};

export default selectItemReducer;

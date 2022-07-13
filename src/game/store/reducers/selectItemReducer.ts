import { compose } from 'redux';
import { ItemReducer, ParentReducer } from 'shared/util/types';
import { Item, VerbConfig, VerbIndex } from '../types';
import {
  setValue, updateValue, withText, keepState, filterValues,
} from './utils';
import genericVerbReducer from './verbReducers/genericVerbReducer';

const takeReducer: ItemReducer = (item, playerState) => {
  if (!playerState.examining) return keepState();
  return compose(
    filterValues(`worldState.entities[${playerState.examining}].contains`)(item.id),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(`Took the ${item.name}.`),
  );
};

export const useReducer: ItemReducer = ({ id }) => compose(
  // TODO NEXT: allow custom text here, for example with the bag:
  // "So you've decided to use your bag... What would you like to use it on?"
  // Also should be able to have custom default text:
  // eg: "That is not something you can do with your bag."
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id),
);

const lookReducer = (description: string) => () => withText(description);

type GetReducer = (verbIndex: VerbIndex, item: Item, verbs: VerbConfig[]) => ItemReducer;
const getReducer: GetReducer = (verbIndex, item, verbs) => {
  switch (verbIndex) {
    case 3:
      return useReducer;
    case 5:
      return takeReducer;
    case 1:
      return lookReducer(item.description);
    default:
      return genericVerbReducer(verbIndex, () => verbs[verbIndex].defaultText);
  }
};

const selectItemReducer: ParentReducer<number> = (id, playerState, worldState, _flags, verbs) => {
  const entity = worldState.entities[id];
  // TODO: devise a better way to ensure the right type of entity gets here
  if (entity.type === 'items') {
    const reducer = getReducer(playerState.verb, entity, verbs);
    return reducer(entity, playerState, _flags);
  }

  return keepState();
};

export default selectItemReducer;

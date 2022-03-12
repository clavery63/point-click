import { compose } from 'redux';
import { ItemReducer, ParentReducer } from 'shared/util/types';
import { Item, VerbIndex } from '../types';
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
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id),
);

const defaultReducer = () => withText('You seem to be wasting your time.');
const lookReducer = (description: string) => () => withText(description);

type GetReducer = (verb: VerbIndex, item: Item) => ItemReducer;
const getReducer: GetReducer = (verb, item) => {
  switch (verb) {
    case 3:
      return useReducer;
    case 5:
      return takeReducer;
    case 4:
      return genericVerbReducer(4, () => 'Smoking that would be ill-advised!');
    case 1:
      return lookReducer(item.description);
    default:
      return defaultReducer;
  }
};

const selectItemReducer: ParentReducer<number> = (id, playerState, worldState, _flags) => {
  const entity = worldState.entities[id];
  // TODO: devise a better way to ensure the right type of entity gets here
  if (entity.type === 'items') {
    const reducer = getReducer(playerState.verb, entity);
    return reducer(entity, playerState, _flags);
  }

  return keepState();
};

export default selectItemReducer;

import { compose } from 'redux';
import { ItemReducer, ParentReducer } from 'shared/util/types';
import { Item } from '../types';
import {
  setValue, updateValue, withText, keepState, filterValues,
} from './utils';
import smokeReducer from './verbReducers/smokeReducer';

const takeReducer: ItemReducer = (item, playerState) => {
  if (!playerState.examining) return keepState();
  return compose(
    filterValues(`worldState.entities[${playerState.examining}].contains`)(item.id),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(`Took the ${item.name}.`),
  );
};

const useReducer: ItemReducer = ({ id }) => compose(
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id),
);

const defaultReducer = () => withText('You seem to be wasting your time.');
const lookReducer = (description: string) => () => withText(description);

type GetReducer = (verb: string, item: Item) => ItemReducer;
const getReducer: GetReducer = (verb, item) => {
  switch (verb) {
    case 'USE':
      return useReducer;
    case 'TAKE':
      return takeReducer;
    case 'SMOKE':
      return smokeReducer;
    case 'LOOK':
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

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
    filterValues(`worldState.scenery[${playerState.examining}].contains`)(item.id),
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
  const object = worldState.items[id];
  object.type = 'items';
  object.id = id;
  const reducer = getReducer(playerState.verb, object);
  return reducer(object, playerState, _flags);
};

export default selectItemReducer;

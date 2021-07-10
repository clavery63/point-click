import { compose } from 'redux';
import { setValue, updateValue, withText, keepState, filterValues } from './utils';
import smokeReducer from './verbReducers/smokeReducer';

const takeReducer = (item, playerState) => {
  if (!playerState.examining) return keepState;
  return compose(
    filterValues(`gameState.scenery.${playerState.examining}.contains`)(item.id),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(`Took the ${item.name}.`)
  );
};

const useReducer = ({ id }) => compose(
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id)
);

const defaultReducer = () => withText('You seem to be wasting your time.');
const lookReducer = description => () => withText(description);

const getReducer = (verb, object) => {
  switch (verb) {
    case 'USE':
      return useReducer;
    case 'TAKE':
      return takeReducer;
    case 'SMOKE':
      return smokeReducer;
    case 'LOOK':
      return lookReducer(object.itemListDescription || object.description);
    default:
      return defaultReducer;
  }
};

const selectItemReducer = (id, playerState, gameState) => {
  const object = { ...gameState.items[id], type: 'items', id };
  const reducer = getReducer(playerState.verb, object)
  return reducer(object, playerState);
};

export default selectItemReducer;

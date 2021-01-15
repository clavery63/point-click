import { compose } from 'redux';
import { setValue, updateValue, withText } from './utils';
import smokeReducer from './verbReducers/smokeReducer';

const takeReducer = item => state => {
  const { playerState } = state;
  if (!playerState.examining) return state;
  const filterItem = items => items.filter(id => id !== item.id);
  return compose(
    updateValue(`gameState.scenery.${playerState.examining}.contains`)(filterItem),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(`Took the ${item.name}.`)
  )(state);
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

const selectItemReducer = id => state => {
  const { gameState, playerState } = state;
  const object = { ...gameState.items[id], type: 'items', id };
  const reducer = getReducer(playerState.verb, object)
  return reducer(object)(state);
};

export default selectItemReducer;

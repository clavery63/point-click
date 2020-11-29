import { compose } from 'redux';
import takeReducer from './verbReducers/takeReducer';
import { setValue, withText } from './utils';

const useReducer = ({ id }) => compose(
  withText('What would you like to use this on?'),
  setValue('playerState.using')(id)
);

const defaultReducer = () => withText('You seem to be wasting your time');
const lookReducer = description => () => withText(description);

const getReducer = (verb, object) => {
  switch (verb) {
    case 'USE':
      return useReducer;
    case 'TAKE':
      return takeReducer;
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

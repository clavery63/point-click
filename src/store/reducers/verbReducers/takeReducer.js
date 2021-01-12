import { compose } from 'lodash/fp';
import { withText, updateValue } from '../utils';

const itemReducer = item => state => {
  const { playerState } = state;
  const filterItem = items => items.filter(id => id !== item.id);
  return compose(
    updateValue(`gameState.rooms.${playerState.room}.items`)(filterItem),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(`The ${item.name} is in hand.`)
  )(state);
};

const takeReducer = object => {
  if (object.type === 'items') {
    return itemReducer(object);
  }
  if (object.type === 'doors') {
    return withText('Forget about it. You cannot take a door.');
  }
  return withText('Can\'t take it!');
};


export default takeReducer;

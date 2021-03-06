import { compose } from 'lodash/fp';
import { withText, updateValue } from '../utils';

const itemReducer = (item, playerState) => {
  const filterItem = items => items.filter(id => id !== item.id);
  return compose(
    updateValue(`gameState.rooms.${playerState.room}.items`)(filterItem),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(item.onTake || `The ${item.name} is in hand.`)
  );
};

const takeReducer = (object, playerState) => {
  if (object.type === 'items' && !object.onEat) {
    return itemReducer(object, playerState);
  }
  if (object.type === 'doors') {
    return withText('Forget about it. You cannot take a door.');
  }
  return withText('Can\'t take it!');
};


export default takeReducer;

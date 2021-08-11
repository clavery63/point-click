import { compose } from 'lodash/fp';
import { withText, updateValue, filterValues } from '../utils';

const itemReducer = (item, playerState) => {
  return compose(
    filterValues(`gameState.rooms.${playerState.room}.items`)(item.id),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(item.onTake || `The ${item.name} is in hand.`)
  );
};

const takeReducer = (object, playerState, flags) => {
  if (object.takeableFlag && !flags.has(object.takableFlag)) {
    return withText(`No good. Taking ${object.name} isn't working`);
  }
  if (object.type === 'items') {
    return itemReducer(object, playerState);
  }
  if (object.type === 'doors') {
    return withText('Forget about it. You cannot take a door.');
  }
  return withText('Can\'t take it!');
};


export default takeReducer;

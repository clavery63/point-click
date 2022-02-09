import { compose } from 'lodash/fp';
import { EntityReducer, ItemReducer } from 'shared/util/types';
import { withText, updateValue, filterValues } from '../utils';

const itemReducer: ItemReducer = (item, playerState) => {
  return compose(
    filterValues(`worldState.rooms[${playerState.room}].items`)(item.id),
    updateValue('playerState.items')(items => [...items, item.id]),
    withText(item.onTake || `The ${item.name} is in hand.`),
  );
};

const takeReducer: EntityReducer = (object, playerState, flags) => {
  if (object.type === 'items') {
    if (object.takeableFlag && !flags.includes(object.takeableFlag)) {
      return withText(`No good. Taking ${object.name} isn't working`);
    }
    return itemReducer(object, playerState, flags);
  }
  if (object.type === 'doors') {
    return withText('Forget about it. You cannot take a door.');
  }
  return withText('Can\'t take it!');
};

export default takeReducer;

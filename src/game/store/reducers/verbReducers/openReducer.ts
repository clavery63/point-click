import { compose } from 'redux';
import { EntityReducer } from 'shared/util/types';
import {
  Door, DoorState, Flag, Scenery,
} from 'game/store/types';
import includesAll from 'shared/util/includesAll';
import { withText, setValue, keepState } from '../utils';

const doorReducer = (door: Door, flags: Flag[]) => {
  switch (door.state) {
    case DoorState.CLOSED:
      if (includesAll(flags, door.openCondition)) {
        return compose(
          withText(door.openText),
          setValue(`worldState.doors[${door.id}].state`)(DoorState.OPEN),
          setValue(`worldState.doors[${door.id}].hidden`)(false),
        );
      }
      return withText(door.closedText);

    case DoorState.LOCKED:
      return withText('The door is locked.');
    case DoorState.OPEN:
    default:
      return withText('It\'s already open!');
  }
};

const sceneryReducer = (scenery: Scenery) => {
  if (!scenery.contains) {
    return keepState();
  }

  return compose(
    setValue('playerState.examining')(scenery.id),
    withText(scenery.openText),
  );
};

const openReducer: EntityReducer = (object, _p, flags) => {
  if (object.type === 'doors') {
    return doorReducer(object, flags);
  }
  if (object.type === 'scenery') {
    return sceneryReducer(object);
  }
  return withText('Can\'t open it.');
};

export default openReducer;

import { compose } from 'redux';
import { EntityReducer } from 'shared/util/types';
import {
  Door, DoorState, Flags, Scenery,
} from 'game/store/types';
import { withText, setValue, keepState } from '../utils';

const doorReducer = (door: Door, flags: Flags) => {
  switch (door.state) {
    case DoorState.CLOSED:
      if (!door.openCondition || flags.includes(door.openCondition)) {
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

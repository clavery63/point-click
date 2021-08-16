import { withText, setValue, keepState } from '../utils';
import { compose } from 'lodash/fp';

const doorReducer = (door, flags) => {
  switch (door.state) {
    case 'CLOSED':
      if (!door.openCondition || flags.has(door.openCondition)) {
        return compose(
          withText(door.openText),
          setValue(`worldState.doors.${door.id}.state`)('OPEN'),
          setValue(`worldState.doors.${door.id}.hidden`)(false)
        );
      } else {
        return withText(door.closedText);
      }
    case 'LOCKED':
      return withText('The door is locked.');
    case 'OPEN':
    default:
      return withText('It\'s already open!');
  }
};

const sceneryReducer = scenery => {
  if (!scenery.contains) {
    return keepState();
  }

  return compose(
    setValue('playerState.examining')(scenery.id),
    withText(scenery.openText)
  );
};

const openReducer = (object, playerState, flags) => {
  if (object.type === 'doors') {
    return doorReducer(object, flags);
  }
  if (object.type === 'scenery') {
    return sceneryReducer(object);
  }
  return withText('Can\'t open it.');
};


export default openReducer;

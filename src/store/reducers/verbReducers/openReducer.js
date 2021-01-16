import { withText, setValue, keepState } from '../utils';
import { compose } from 'lodash/fp';

const doorReducer = door => state => {
  switch (door.state) {
    case 'CLOSED':
      if (!door.openCondition || state.gameState.flags.has(door.openCondition)) {
        return compose(
          withText(door.openText),
          setValue(`gameState.doors.${door.id}.state`)('OPEN'),
          setValue(`gameState.doors.${door.id}.hidden`)(false)
        )(state);
      } else {
        return withText(door.closedText)(state);
      }
    case 'LOCKED':
      return withText('The door is locked.')(state);
    case 'OPEN':
    default:
      return withText('It\'s already open!')(state);
  }
};

const sceneryReducer = scenery => {
  if (!scenery.contains) {
    return keepState();
  }

  return setValue('playerState.examining')(scenery.id);
};

const openReducer = object => {
  if (object.type === 'doors') {
    return doorReducer(object);
  }
  if (object.type === 'scenery') {
    return sceneryReducer(object);
  }
  return withText('Can\'t open it.');
};


export default openReducer;

import { withText, setValue } from '../utils';
import { compose } from 'lodash/fp';

const doorReducer = door => {
  switch(door.state) {
    case 'CLOSED':
      return compose(
        withText(door.openText),
        setValue(`gameState.doors.${door.id}.state`)('OPEN')
      );
    case 'LOCKED':
      return withText('The door is locked.');
    case 'OPEN':
    default:
      return withText('It\'s already open!');
  }
};

const sceneryReducer = scenery => {
  return withText('Nice try, man.');
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

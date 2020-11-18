import { withText, setState } from '../utils';
import { compose } from 'lodash/fp';

const doorReducer = door => {
  switch(door.state) {
    case 'CLOSED': 
      return compose(
        withText(door.openText),
        setState(`gameState.doors.${door.id}.state`, 'OPEN')
      );
    case 'LOCKED':
      return withText('The door is locked.');
    case 'OPEN':
    default:
      return withText('It\'s already open!');
  }
};

const openReducer = object => {
  if (object.type === 'doors') {
    return doorReducer(object);
  }
  return withText('Can\'t open it.');
};


export default openReducer;

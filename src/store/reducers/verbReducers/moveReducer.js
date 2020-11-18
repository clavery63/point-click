import { withText, setState } from '../utils';

const doorReducer = door => {
  switch (door.state) {
    case 'OPEN': 
      return setState('playerState.room', door.dest);
    default:
      return withText('You have to open the door before you go through it.');
  }
};

const moveReducer = object => {
  if (object.type === 'doors') {
    return doorReducer(object);
  }
  return withText('You can\'t do that!');
};


export default moveReducer;

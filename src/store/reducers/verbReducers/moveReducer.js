import { withText } from '../utils';

const doorReducer = door => {
  if (door.state === 'OPEN') {
    return state => ({
      ...state,
      playerState: {
        ...state.playerState,
        room: door.dest
      }
    });
  }

  return withText('You have to open the door before you go through it.');
};

const moveReducer = object => {
  if (object.type === 'doors') {
    return doorReducer(object);
  }
  return withText('You can\'t do that!');
};


export default moveReducer;

import { withText } from '../utils';

const doorReducer = door => {
  if (door.state === 'CLOSED') {
    const newDoor = { ...door, state: 'OPEN' };
    return state => ({
      ...state,
      gameState: {
        ...state.gameState,
        doors: {
          ...state.gameState.doors,
          [door.id]: newDoor
        }
      }
    });
  }
  if (door.state === 'OPEN') {
    return withText('It\'s already open!');
  }
  if (door.state === 'LOCKED') {
    return withText('The door is locked.');
  }
};

const openReducer = object => {
  if (object.type === 'doors') {
    return doorReducer(object);
  }
  return withText('Can\'t open it.');
};


export default openReducer;

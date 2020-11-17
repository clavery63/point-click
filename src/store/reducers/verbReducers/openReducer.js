const doorReducer = (state, door) => {
  const { gameState } = state;
  if (door.state === 'CLOSED') {
    const newDoor = { ...door, state: 'OPEN' };
    return {
      ...state,
      gameState: {
        ...gameState,
        doors: {
          ...gameState.doors,
          [door.id]: newDoor
        }
      }
    };
  }
  if (door.state === 'OPEN') {
    return {
      ...state,
      nextText: 'It\'s already open!'
    };
  }
  if (door.state === 'LOCKED') {
    return {
      ...state,
      nextText: 'It\'s locked!'
    };
  }
};

const openReducer = (state, object) => {
  if (object.type === 'doors') {
    return doorReducer(state, object);
  }
  return {
    ...state,
    nextText: 'Can\'t open it.'
  }
};


export default openReducer;

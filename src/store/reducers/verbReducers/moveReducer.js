const doorReducer = (state, door) => {
  const { playerState } = state;
  if (door.state === 'OPEN') {
    return {
      ...state,
      playerState: {
        ...playerState,
        room: door.dest
      }
    };
  }

  return {
    ...state,
    nextText: 'You have to open the door before you go through it.'
  }
};

const moveReducer = object => state => {
  if (object.type === 'doors') {
    return doorReducer(state, object);
  }
  return {
    ...state,
    nextText: 'You can\'t do that!'
  }
};


export default moveReducer;

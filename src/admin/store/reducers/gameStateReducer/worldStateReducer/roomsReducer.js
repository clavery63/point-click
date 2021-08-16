const roomsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.rooms;
    default:
      return state;
  }
};

export default roomsReducer;

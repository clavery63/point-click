const roomsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.rooms;
    case 'SET_ROOM':
      return {
        ...state,
        [action.payload.id]: action.payload.room
      };
    default:
      return state;
  }
};

export default roomsReducer;

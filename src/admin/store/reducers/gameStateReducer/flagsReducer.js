const flagsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.flags;
    default:
      return state;
  }
};

export default flagsReducer;

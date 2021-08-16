const doorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.doors;
    default:
      return state;
  }
};

export default doorsReducer;

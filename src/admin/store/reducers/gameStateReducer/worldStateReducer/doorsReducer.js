const doorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      debugger;
      return action.payload.worldState.doors;
    default:
      return state;
  }
};

export default doorsReducer;

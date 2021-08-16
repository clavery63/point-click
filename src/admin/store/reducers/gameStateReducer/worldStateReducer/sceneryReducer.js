const sceneryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.scenery;
    default:
      return state;
  }
};

export default sceneryReducer;

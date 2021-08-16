const playerStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.playerState;
    default:
      return state;
  }
};

export default playerStateReducer;

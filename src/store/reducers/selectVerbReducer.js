const selectVerbReducer = (state, payload) => ({ 
  ...state,
  playerState: {
    ...state.playerState,
    verb: payload
  }
});

export default selectVerbReducer;

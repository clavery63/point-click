const selectVerbReducer = payload => state => ({ 
  ...state,
  playerState: {
    ...state.playerState,
    verb: payload
  }
});

export default selectVerbReducer;

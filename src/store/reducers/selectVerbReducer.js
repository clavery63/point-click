const selectVerbReducer = (state, payload) => ({ 
  ...state,
  playerState: {
    ...state.playerState,
    verb: payload
  },
  nextText: `You have selected ${payload}`
});

export default selectVerbReducer;

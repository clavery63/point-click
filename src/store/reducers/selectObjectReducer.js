const selectObjectReducer = (state, payload) => {
  const object = state.gameState[payload.type][payload.id];
  if (state.playerState.verb === 'LOOK') {
    return {
      ...state,
      nextText: object.description
    };
  }
  return state;
};

export default selectObjectReducer;

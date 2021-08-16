const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.items;
    default:
      return state;
  }
};

export default itemsReducer;

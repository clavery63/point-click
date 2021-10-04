const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.worldState.items;
    case 'SET_ITEM_POSITION':
      const oldItem = state[action.payload.id];
      return {
        ...state,
        [action.payload.id]: {
          ...oldItem,
          position: {
            ...oldItem.position,
            left: action.payload.x,
            top: action.payload.y,
          }
        }
      }
    case 'SET_ITEM':
      return action.payload;
    default:
      return state;
  }
};

export default itemsReducer;

const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return action.payload.images;
    default:
      return state;
  }
};

export default imagesReducer;

const selectedEntityReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.payload;
    case 'CLEAR_SELECTED':
      return null;
    default:
      return state;
  }
};

export default selectedEntityReducer;

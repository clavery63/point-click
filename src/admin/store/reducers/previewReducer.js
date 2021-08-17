const previewReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PREVIEW':
      return action.payload;
    case 'CLEAR_PREVIEW':
      return null;
    default:
      return state;
  }
};

export default previewReducer;

const previewReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_PREVIEW':
      return !state;
    default:
      return state;
  }
};

export default previewReducer;

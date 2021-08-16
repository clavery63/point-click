const previewReducer = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_PREVIEW':
      return !state;
    default:
      return state;
  }
};

export default previewReducer;

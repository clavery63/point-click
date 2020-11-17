const lookReducer = (state, object) => ({
  ...state,
  nextText: object.description
});

export default lookReducer;

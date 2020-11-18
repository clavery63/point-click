const lookReducer = object => state => ({
  ...state,
  nextText: object.description
});

export default lookReducer;

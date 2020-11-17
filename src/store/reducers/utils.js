export const setValue = key => (state, payload) => ({
  ...state,
  [key]: payload
});

export const clearValue = key => state => ({
  ...state,
  [key]: null
});

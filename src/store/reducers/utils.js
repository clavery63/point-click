export const setValue = key => payload => state => ({
  ...state,
  [key]: payload
});

export const clearValue = key => () => state => ({
  ...state,
  [key]: null
});

export const withText = nextText => state => ({ ...state, nextText });

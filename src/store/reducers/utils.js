import { setWith, clone } from 'lodash';

export const setValue = key => payload => state => ({
  ...state,
  [key]: payload
});

export const clearValue = key => () => state => ({
  ...state,
  [key]: null
});

export const withText = nextText => state => ({ ...state, nextText });

export const setState = (path, value) => state => {
  return setWith(clone(state), path, value, clone);
};

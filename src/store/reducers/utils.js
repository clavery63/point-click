import { setWith, clone } from 'lodash';

export const setValue = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const clearValue = path => () => state => {
  return setWith(clone(state), path, null, clone);
};

export const withText = setValue('nextText');

export const keepState = () => state => state;

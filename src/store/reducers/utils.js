import { setWith, clone, get } from 'lodash';

export const isNull = value => value === null;
export const notNull = value => !isNull(value);

export const setValue = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const clearValue = path => () => state => {
  return setWith(clone(state), path, null, clone);
};

export const withText = setValue('nextText');

export const keepState = () => state => state;

export const ifState = (path, predicate = notNull) => reducer => value => state => {
  if (predicate(get(state, path))) {
    return reducer(value)(state);
  }
  return state;
}

import { setWith, clone, get } from 'lodash';

export const isNull = value => value === null;
export const notNull = value => !isNull(value);

export const setValue = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const updateValue = path => fn => state => {
  const oldValue = get(state, path);
  return setWith(clone(state), path, fn(oldValue), clone);
};

export const clearValue = path => () => state => {
  return setWith(clone(state), path, null, clone);
};

export const withText = setValue('nextText');

export const keepState = () => state => state;

export const ifState = (path, predicate = notNull) => (ifReducer, elseReducer) => {
  return value => state => {
    if (predicate(get(state, path), value)) {
      return ifReducer(value)(state);
    }
    return elseReducer ? elseReducer(value)(state) : state;
  }
};

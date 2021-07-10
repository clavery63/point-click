import { setWith, clone, get } from 'lodash';

export const isNull = value => value === null;
export const notNull = value => !isNull(value);

export const setValue = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const updateValue = path => fn => state => {
  const newValue = fn(get(state, path));
  return setValue(path)(newValue)(state);
};

export const clearValue = path => setValue(path)(null);

export const withText = setValue('nextText');

export const keepState = () => state => state;

export const filterValues = path => id => updateValue(path)(objects => {
  return objects.filter(objectId => objectId !== id);
});

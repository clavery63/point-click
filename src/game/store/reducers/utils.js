import { setWith, clone } from 'lodash';
import { compose } from 'redux';
import get from 'shared/util/get';

export const isNull = value => value === null;
export const notNull = value => !isNull(value);

export const setValue = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const updateValue = path => fn => state => {
  const newValue = fn(get(state, path));
  return setValue(path)(newValue)(state);
};

export const addFlags = flagsToAdd => {
  return updateValue('flags')(flags => {
    flagsToAdd.forEach(flag => flags.add(flag));
    return flags;
  });
};

export const removeFlags = flagsToRemove => {
  return updateValue('flags')(flags => {
    flagsToRemove.forEach(flag => flags.delete(flag));
    return flags;
  });
};

export const combineReducers = (...reducers) => (...args) => {
  return compose(...reducers.map(reducer => reducer(...args)));
};

export const clearValue = path => setValue(path)(null);

export const withText = setValue('nextText');

export const keepState = () => state => state;

export const when = pred => transform => {
  return pred ? transform : keepState();
};

export const filterValues = path => id => updateValue(path)(objects => {
  return objects.filter(objectId => objectId !== id);
});

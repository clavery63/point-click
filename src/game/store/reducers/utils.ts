import { setWith, clone } from 'lodash';
import { compose } from 'redux';
import filter from 'shared/util/filter';
import get from 'shared/util/get';
import { ValueUpdater, Reducer, StateTransformer, NumberArrayPath } from 'shared/util/types';
import { Entity, PlayerState, Flags, GameState } from '../types';

export const isNull = (value: any) => value === null;
export const notNull = (value: any) => !isNull(value);

export const setValue = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const updateValue: ValueUpdater = (path, fn) => state => {
  const newValue = fn(get(state, path));
  return setValue(path)(newValue)(state);
};

export const addFlags = (flagsToAdd: string[]) => {
  return updateValue('flags', flags => {
    flagsToAdd.forEach(flag => flags.add(flag));
    return flags;
  });
};

export const removeFlags = (flagsToRemove: string[]) => {
  return updateValue('flags', flags => {
    flagsToRemove.forEach(flag => flags.delete(flag));
    return flags;
  });
};

export const combineReducers = (...reducers: Reducer[]) => (...args: [Entity, PlayerState, Flags]) => {
  return compose(...reducers.map(reducer => reducer(...args)));
};

export const clearValue = (path: string) => setValue(path)(null);

export const withText = setValue('nextText');

export const keepState = () => (state: GameState) => state;

export const when = (pred: boolean) => (transform: StateTransformer) => {
  return pred ? transform : keepState();
};

export const filterValues = <
  PathType extends NumberArrayPath
>(path: PathType) => (id: number) => updateValue<NumberArrayPath>(path, objects => {
  return filter(objects, objectId => objectId !== id);
});

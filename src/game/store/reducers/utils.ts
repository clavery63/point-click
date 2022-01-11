import { setWith, clone } from 'lodash';
import { compose } from 'redux';
import filter from 'shared/util/filter';
import get, { GetFieldType } from 'shared/util/get';
import { ValueUpdater, EntityReducer, EmptyReducer, StateTransformer, NumberArrayPath, NullablePath } from 'shared/util/types';
import { Entity, PlayerState, Flags, GameStoreState } from '../types';

export const isNull = (value: any) => value === null;
export const notNull = (value: any) => !isNull(value);

type ValueSetterWithPath<PathType> = {
  (value: GetFieldType<GameStoreState, PathType>): StateTransformer
}

type ValueSetter = {
  <PathType extends string>(
    path: PathType
  ): ValueSetterWithPath<PathType>
};

export const setValue: ValueSetter = path => value => state => {
  return setWith(clone(state), path, value, clone);
};

export const updateValue: ValueUpdater = (path) => (fn) => state => {
  const newValue = fn(get(state, path));
  return setValue(path)(newValue)(state);
};

export const addFlags = (flagsToAdd: string[]) => {
  return updateValue('flags')(flags => {
    flagsToAdd.forEach(flag => flags.add(flag));
    return flags;
  });
};

export const removeFlags = (flagsToRemove: string[]) => {
  return updateValue('flags')(flags => {
    flagsToRemove.forEach(flag => flags.delete(flag));
    return flags;
  });
};

export const combineReducers = (...reducers: EntityReducer[]) => (...args: [Entity, PlayerState, Flags]) => {
  return compose(...reducers.map(reducer => reducer(...args)));
};

export const clearValue = (path: NullablePath) => setValue(path)(null);

export const withText = setValue('nextText');

export const keepState: EmptyReducer = () => state => state;

export const when = (pred: boolean) => (transform: StateTransformer) => {
  return pred ? transform : keepState();
};

export const filterValues = <
  PathType extends NumberArrayPath
>(path: PathType) => (id: number) => updateValue<NumberArrayPath>(path)(objects => {
  return filter(objects, objectId => objectId !== id);
});

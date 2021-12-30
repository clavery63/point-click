import { setWith, clone } from 'lodash';
import { compose } from 'redux';
import get, { GetFieldType } from 'shared/util/get';
import { GameStoreState, Entity, PlayerState, Flags } from '../types';

type Transformer<T> = (arg: T) => T;

type StateTransformer = Transformer<GameStoreState>;

type ValueUpdater = {
  <PathType extends string>(
    path: PathType,
    fn: Transformer<GetFieldType<GameStoreState, PathType>>
  ): StateTransformer
};

type Reducer = {
  (ent: Entity, playerState: PlayerState, flags: Flags): StateTransformer;
}

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

export const clearValue = path => setValue(path)(null);

export const withText = setValue('nextText');

export const keepState = () => state => state;

export const when = pred => transform => {
  return pred ? transform : keepState();
};

export const filterValues = path => id => updateValue(path, objects => {
  return objects.filter(objectId => objectId !== id);
});

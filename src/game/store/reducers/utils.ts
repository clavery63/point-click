import { setWith, clone } from 'lodash';
import { compose } from 'redux';
import get, { GetFieldType } from 'shared/util/get';
import { GameStoreState, Entity, PlayerState, Flags, GameState } from '../types';

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

updateValue('playerState.items', items => [...items, 111])

const filt = (id: number) => (objects: number[]) => {
  return objects.filter((objectId: number) => objectId !== id);
}

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


type Basic = number | string | string[] | any[] | Set<any> | boolean | Function | undefined;

type ConditionalTypes<Base, Condition> =  {
  // TODO: recursion is fun, but let's just manually loop through the few fields we know we have :-/
  [Key in keyof Base]: Base[Key] extends Basic ? (Base[Key] extends Condition ? Key : never) : ConditionalTypes<Base[Key], Condition>;
}[keyof Base]

interface Nested {
  things: number[];
  index: number;
  name: string;
}

interface RootType {
  verb: string;
  room: number;
  items: number[];
  nested: Nested
  page: number;
}

type Testing = ConditionalTypes<RootType, any[]>;




type Base = `worldState.rooms[${number}].description`;
type MyDesc = 'worldState.rooms[2].description';
type MyDesc2 = 'playerState.verb';

type Result = GetFieldType<GameStoreState, Base | MyDesc2>;

type Verbo = GetFieldType<GameStoreState, `worldState.items[${number}].verbs[10]`>

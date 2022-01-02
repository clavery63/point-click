import { setWith, clone } from 'lodash';
import { compose } from 'redux';
import get, { GetFieldType } from 'shared/util/get';
import { GameStoreState, Entity, PlayerState, Flags, GameState, WorldState, Item, Door, Scenery, Verb, Room, Position } from '../types';

type Transformer<T> = (arg: T) => T;

type StateTransformer = Transformer<GameStoreState>;

type ValueUpdater<Override = string> = {
  <PathType extends string & Override>(
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

export const clearValue = (path: string) => setValue(path)(null);

export const withText = setValue('nextText');

export const keepState = () => (state: GameState) => state;

export const when = (pred: boolean) => (transform: StateTransformer) => {
  return pred ? transform : keepState();
};

export const filterValues = <
  PathType extends NumberArrayPath
>(path: PathType) => (id: number) => updateValue<NumberArrayPath>(path, objects => {
  return objects?.filter(objectId => objectId !== id);
});

const chris = 0;

const index = '0';
const type = 'scenery';

filterValues(`worldState.${type}[${chris}].contains`)(111)


type Basic = number | string | string[] | number[] | Set<any> | boolean | Function;

type ConstrainedTypes<Base, Constraint, Prefix extends string = '', Dumb = 0> = {
  [Key in keyof Base]: Key extends string
    ? Base[Key] extends Basic
      ? (Base[Key] extends Constraint
          ? `${Prefix}${Key}`
        : never)
      : Base[Key] extends any[]
        ? Dumb extends keyof Base[Key]
          // TODO: Only include Key here if the constraint is any[]
          // Actually it's more nuanced than that... so table it for now
          ? Key | ConstrainedTypes<Base[Key][Dumb], Constraint, `${Prefix}${Key}[${number}].`> 
          : never
        : ConstrainedTypes<Base[Key], Constraint, `${Prefix}${Key}.`>
    : never
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
  nested: Nested[]
  page: number;
}


// this doesn't look quite perfect. there's a bug where some of the paths seem to be missing prefixes
type NumberArrayPath = ValidPathsFor<number[]>;
type ValidPathsFor<Constraint> = Exclude<ConstrainedTypes<GameState, Constraint>, undefined>;




type Base = `worldState.rooms[3].description`;
type MyDesc = 'worldState.rooms[2].description';
type MyDesc2 = 'playerState.verb';

type checkingAgain = MyDesc extends Base ? true : false;

type Result = GetFieldType<GameStoreState, Base | MyDesc2>;

type ThisAgain = `worldState.items[0].verbs[420].addFlags` extends `worldState.items[${number}].verbs[${number}].addFlags` ? true : false;

type Verbo = GetFieldType<GameStoreState, `worldState.items[${number}].verbs[${number}].addFlags`>

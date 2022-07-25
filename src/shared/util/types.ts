import {
  Door,
  Entity,
  Flag,
  GameStoreState,
  Item,
  Nullable,
  PlayerState,
  Scenery,
  VerbConfig,
  WorldState,
  // NOTE: made this a relative import for validation generation.
  // We can change this back if ts-json-schema-generator starts tolerating
  // template string literals.
} from '../../game/store/types';
import { GetFieldType } from './get';

export type Transformer<T> = (arg: T) => T;

export type StateTransformer = Transformer<GameStoreState>;

type ChildReducer<T> = {
  (ent: T, playerState: PlayerState, flags: Flag[]): StateTransformer;
};

export type EntityReducer = ChildReducer<Entity>;
export type ItemReducer = ChildReducer<Item>;
export type SceneryReducer = ChildReducer<Scenery>;
export type DoorReducer = ChildReducer<Door>;

export type ParentReducer<PayloadType> = {
  // TODO: group verb names and flags together
  // eslint-disable-next-line max-len
  (p: PayloadType, ps: PlayerState, w: WorldState, f: Flag[], verbNames: VerbConfig[]): StateTransformer;
};

export type EmptyReducer = () => StateTransformer;

type Basic = string | string[] | number | number[] | Set<any> | boolean |
  Function | null | undefined | Map<any, any>;

type MaybePathName<Constraint, Base, Key extends keyof Base & string, Prefix extends string> = (Base[Key] extends Constraint ? `${Prefix}${Key}` : never);

type ConstrainedTypes<Base, Constraint, Prefix extends string = '', AnyNumber = 0> = {
  [Key in keyof Base]: Key extends string
    ? Base[Key] extends Basic
      ? MaybePathName<Constraint, Base, Key, Prefix>
      : AnyNumber extends keyof Base[Key]
          ? MaybePathName<Constraint, Base, Key, Prefix> | ConstrainedTypes<Base[Key][AnyNumber], Constraint, `${Prefix}${Key}[${number}].`>
          : ConstrainedTypes<Base[Key], Constraint, `${Prefix}${Key}.`>
    : never
}[keyof Base];

type GetNullables<Base, Prefix extends string = '', AnyNumber = 0> = {
  [Key in keyof Base]: Key extends string
    ? Base[Key] extends Basic
      // You can use (null & undefined) here to catch both, if that's what we want
      ? (null extends Base[Key] ? `${Prefix}${Key}` : never)
      : Base[Key] extends any[]
        ? AnyNumber extends keyof Base[Key]
          ? GetNullables<Base[Key][AnyNumber], `${Prefix}${Key}[${number}].`>
          : never
        : GetNullables<Base[Key], `${Prefix}${Key}.`>
    : never
}[keyof Base];

export type ValidPathsFor<Root, Constraint> =
  Exclude<ConstrainedTypes<Root, Constraint>, undefined>;

export type NumberArrayPath = ValidPathsFor<GameStoreState, number[]>;
export type NumberPath = ValidPathsFor<GameStoreState, number>;
export type NullablePath = Exclude<GetNullables<GameStoreState>, undefined>;

export type ValueUpdater<Override = string> = {
  <PathType extends string & Override>(
    path: PathType,
  ): (fn: Transformer<GetFieldType<GameStoreState, PathType>>) => StateTransformer;
};

// NOTE: This almost definited doesn't have to be here, but I'm using it right
// now for the validation generator AST traversal. We should be able to grab
// this directly from the NumberPath type.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ValidationCreator {
  numberPath: ValidPathsFor<GameStoreState, Nullable<number>>;
}

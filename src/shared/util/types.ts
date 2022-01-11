import { Door, Entity, Flags, GameStoreState, Item, PlayerState, Scenery, WorldState } from "game/store/types";
import { GetFieldType } from "./get";

export type Transformer<T> = (arg: T) => T;

export type StateTransformer = Transformer<GameStoreState>;

type ChildReducer<T> = {
  (ent: T, playerState: PlayerState, flags: Flags): StateTransformer;
}

export type EntityReducer = ChildReducer<Entity>;
export type ItemReducer = ChildReducer<Item>;
export type SceneryReducer = ChildReducer<Scenery>;
export type DoorReducer = ChildReducer<Door>;
export type ItemOrSceneryReducer = ChildReducer<Item | Scenery>;

export type ParentReducer<PayloadType> = {
  (payload: PayloadType, playerState: PlayerState, worldState: WorldState, flags: Flags): StateTransformer;
}

export type EmptyReducer = () => StateTransformer;

type Basic = string | string[] | number | number[] | Set<any> | boolean | Function | null | undefined;

type MaybePathName<Constraint, Base, Key extends keyof Base & string, Prefix extends string> = (Base[Key] extends Constraint ? `${Prefix}${Key}` : never);

type ConstrainedTypes<Base, Constraint, Prefix extends string = '', AnyNumber = 0> = {
  [Key in keyof Base]: Key extends string
    ? Base[Key] extends Basic
      ? MaybePathName<Constraint, Base, Key, Prefix>
      : Base[Key] extends any[]
        ? AnyNumber extends keyof Base[Key]
          ? MaybePathName<Constraint, Base, Key, Prefix> | ConstrainedTypes<Base[Key][AnyNumber], Constraint, `${Prefix}${Key}[${number}].`> 
          : never
        : ConstrainedTypes<Base[Key], Constraint, `${Prefix}${Key}.`>
    : never
}[keyof Base]

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
}[keyof Base]

type ValidPathsFor<Constraint> = Exclude<ConstrainedTypes<GameStoreState, Constraint>, undefined>;
 
export type NumberArrayPath = ValidPathsFor<number[]>;
export type NullablePath = Exclude<GetNullables<GameStoreState>, undefined>;

export type ValueUpdater<Override = string> = {
  <PathType extends string & Override>(
    path: PathType,
  ): (fn: Transformer<GetFieldType<GameStoreState, PathType>>) => StateTransformer
};

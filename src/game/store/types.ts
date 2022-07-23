import { Store } from 'redux';
// NOTE: made this a relative import for validation generation.
// We can change this back if ts-json-schema-generator starts tolerating
// template string literals.
import { NumberPath, ValidPathsFor } from '../../shared/util/types';

export type MapCoord = 0 | 1 | 2 | 3 | 4;

export enum DoorState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  LOCKED = 'LOCKED'
}
export enum DoorDir {
  UP = 'UP',
  DOWN = 'DOWN',
  FORWARD = 'FORWARD',
  BACK = 'BACK',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export type PageDir = 'UP' | 'DOWN';
export type Menu = 'NONE' | 'MAIN' | 'GAME_OVER';
export type EntityType = 'items' | 'scenery' | 'doors';
export type Flag = string;

export type Nullable<T> = T | null | undefined;

export type Lookup<T> = {
  [key: number]: T;
};

export type StringLookup<T> = {
  [key: string]: T;
};

export interface Position {
  left: number;
  top: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface MapPosition {
  x: MapCoord;
  y: MapCoord;
}

export interface Music {
  text?: string;
  fileName: Nullable<string>;
}

export interface Door {
  type: 'doors';
  id: number;
  name?: string;
  closedImg?: string;
  openImg?: string;
  position?: Position;
  mapPosition: MapPosition;
  dest: number;
  dir: DoorDir;
  state: DoorState;
  description?: string; // Should this be mandatory?
  closedText?: string;
  lockedText?: string;
  unlockText?: string;
  openText?: string;
  keyId?: number;
  hidden?: boolean;
  openCondition?: Flag;
  // TODO: Somehow make the shared fields between entities more explicit
  verbs?: VerbMappings;
}

export type Effect = {
  action: 'SET_NUMBER_VALUE';
  /**
   * @type path-number
   */
  path: NumberPath;
  value: number;
} | {
  action: 'SET_MUSIC';
  value: {
    text?: string;
    fileName: string;
  };
};

export enum Operator {
  LT = 'LT',
  EQ = 'EQ',
  GT = 'GT'
}

export type Condition = {
  field: ValidPathsFor<Item, Nullable<number>>;
  operator: Operator;
  value: number;
};

export interface VerbLogic {
  text?: string;
  moveTo?: number;
  moveDir?: DoorDir;
  addFlags?: Flag[];
  removeFlags?: Flag[];
  prereqFlags?: Flag[];
  prereqUsing?: number;
  effects?: Effect[];
  condition?: Condition;
}

export type VerbMappings = {
  0?: VerbLogic[];
  1?: VerbLogic[];
  2?: VerbLogic[];
  3?: VerbLogic[];
  4?: VerbLogic[];
  5?: VerbLogic[];
  6?: VerbLogic[];
  7?: VerbLogic[];
  8?: VerbLogic[];
};

export type VerbIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface ImgSet {
  img: string;
  width: number;
  conditions: {
    index: number;
    condition: Condition;
  }[];
}

/**
 * README:
 *
 * This is where I'm defining really specific things entities can do that require
 * custom code. It's not great, but it allows us to continue avoiding referencing
 * any specific entities in the engine itself.
 */
export enum Capability {
  RAND_HORIZ = 'RAND_HORIZ',
}

export interface Item {
  type: 'items';
  id: number;
  name: string;
  description: string;
  position?: Position;
  img?: string;
  imgSet?: ImgSet;
  // TODO: see if this can use genericVerbReducer
  onTake?: string;
  takeableFlag?: Flag;
  visibleFlag?: Flag;
  requiresPrecision?: boolean;
  verbs?: VerbMappings;
  contains: Nullable<number[]>;
  isStatic?: boolean;
  time?: number;
  timeEffect?: TimeEffect;
  capabilities?: Capability[];
}

interface TimeEffect {
  time: number;
  effect: VerbLogic;
}

export interface Scenery {
  type: 'scenery';
  id: number;
  name?: string;
  description?: string; // Optional for now since LOOK effects mask it
  startPosition: Position;
  endPosition?: Position;
  position?: Position;
  size?: Size;
  img?: string;
  openText?: string;
  verbs?: VerbMappings;
  contains: Nullable<number[]>;
  trigger?: VerbIndex;
  movedText?: string;
  takeableFlag?: Flag;
  visibleFlag?: Flag;
  isStatic?: boolean;
  time?: number;
  timeEffect?: TimeEffect;
}

export interface Room {
  img?: string;
  music?: string;
  video?: string;
  initialDescription?: Nullable<string>;
  description: string;
  doors: number[];
  entities: number[];
  gameOver?: boolean;
}

export interface WorldState {
  doors: Lookup<Door>;
  entities: Lookup<Item | Scenery>;
  rooms: Lookup<Room>;
}

export interface PlayerState {
  verb: VerbIndex;
  using?: Nullable<number>;
  examining: Nullable<number>;
  room: number;
  items: number[];
  page: number;
}

export enum VerbBehavior {
  NONE = 'NONE',
  MOVE = 'MOVE',
  LOOK = 'LOOK',
  OPEN = 'OPEN',
  USE = 'USE',
  TAKE = 'TAKE'
}

export type VerbConfig = {
  name: string;
  defaultText?: string;
  defaultBehavior: VerbBehavior;
};

export type ImgConfig = {
  cursor?: string;
  menu?: string;
  itemList?: string;
};

export type PositionsConfig = {
  verbs: [
    Position,
    Position,
    Position,
    Position,
    Position,
    Position,
    Position,
    Position,
    Position,
  ];
  pageDown: Position;
  pageUp: Position;
  self: Position;
  save: Position;
  miniMap: Position;
};

export type ColorsConfig = {
  background: string;
};

export type Config = {
  verbs: VerbConfig[];
  positions: PositionsConfig;
  img: ImgConfig;
  colors: ColorsConfig;
  friendlyName: string;
};

export interface GameState {
  worldState: WorldState;
  playerState: PlayerState;
  flags: Flag[];
  config: Config;
}

export type Entity = Door | Item | Scenery;

export interface GameStoreState extends GameState {
  transition: {
    dest: Nullable<number>;
    dir: DoorDir;
    frame?: number;
  };
  transient: {
    nextText: Nullable<string>;
    nextMusic: Music;
  };
  text: Nullable<string[]>;
  loading: boolean;
  menu: Menu;
  cursorEnabled: boolean;
  gameName: string;
  images: Map<string, HTMLImageElement>;
}

export type GameStore = Store<GameStoreState>;

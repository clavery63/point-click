import { Store } from 'redux';
// NOTE: made this a relative import for validation generation.
// We can change this back if ts-json-schema-generator starts tolerating
// template string literals.
import { NumberPath } from '../../shared/util/types';

type MapCoord = 0 | 1 | 2 | 3 | 4;
type DoorState = 'CLOSED' | 'OPEN' | 'LOCKED';

export type DoorDir = 'UP' | 'DOWN' | 'FORWARD' | 'BACK' | 'LEFT' | 'RIGHT';
export type PageDir = 'UP' | 'DOWN';
export type Menu = 'NONE' | 'MAIN' | 'GAME_OVER';
export type EntityType = 'items' | 'scenery' | 'doors';

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

interface MapPosition {
  x: MapCoord;
  y: MapCoord;
}

export interface Door {
  type: 'doors';
  id: number;
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
  openCondition?: string;
  // TODO: Somehow make the shared fields between entities more explicit
  verbs?: VerbMappings;
}

// NOTE: This will probably eventually be a union type with different effects,
// If we actually want to expand this idea. Very hard-coded
export interface Effect {
  action: 'SET_NUMBER_VALUE';
  /**
   * @type path-number
   */
  path: NumberPath;
  value: number;
}

export interface VerbLogic {
  text?: string;
  moveTo?: number;
  moveDir?: DoorDir;
  addFlags?: string[];
  removeFlags?: string[];
  prereqFlags?: string[];
  prereqUsing?: number;
  effects?: Effect[];
}

export type VerbMappings = {
  'MOVE'?: VerbLogic[];
  'LOOK'?: VerbLogic[];
  'OPEN'?: VerbLogic[];
  'USE'?: VerbLogic[];
  'SMOKE'?: VerbLogic[];
  'TAKE'?: VerbLogic[];
  'EAT'?: VerbLogic[];
  'HIT'?: VerbLogic[];
  'SPEAK'?: VerbLogic[];
};

export type VerbIndex = keyof VerbMappings;

export interface Item {
  type: 'items';
  id: number;
  name: string;
  description: string;
  position?: Position;
  img?: string;
  // TODO: see if this can use genericVerbReducer
  onTake?: string;
  takeableFlag?: string;
  visibleFlag?: string;
  requiresPrecision?: boolean;
  verbs?: VerbMappings;
}

export interface Scenery {
  type: 'scenery';
  id: number;
  name?: string;
  description?: string; // Optional for now since LOOK effects mask it
  startPosition: Position;
  endPosition?: Position;
  currentPosition?: Position;
  size?: Size;
  img?: string;
  openText?: string;
  verbs?: VerbMappings;
  contains: Nullable<number[]>;
  trigger?: string;
  movedText?: string;
  visibleFlag?: string;
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
  items: Lookup<Item>;
  scenery: Lookup<Scenery>;
  rooms: Lookup<Room>;
}

export interface PlayerState {
  verb: VerbIndex;
  using?: Nullable<number>;
  examining: Nullable<number>;
  room: number;
  items: number[];
  page: number;
  timer: number;
}

export type Flags = string[];

export interface GameState {
  worldState: WorldState;
  playerState: PlayerState;
  flags: Flags;
}

export type Entity = Door | Item | Scenery;

export interface GameStoreState extends GameState {
  transition: {
    dest: Nullable<number>;
    dir: DoorDir;
    frame?: number;
  };
  text: Nullable<string[]>;
  nextText: Nullable<string>;
  loading: boolean;
  menu: Menu;
  cursorEnabled: boolean;
  gameName: string;
  images: Map<string, HTMLImageElement>;
}

export type GameStore = Store<GameStoreState>;

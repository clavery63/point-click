import { Store } from "redux";

type MapCoord = 0 | 1 | 2 | 3 | 4;
type VerbIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; 
type DoorState = 'CLOSED' | 'OPEN' | 'LOCKED';
export type DoorDir = 'UP' | 'DOWN' | 'FORWARD' | 'BACK' | 'LEFT' | 'RIGHT';
export type Menu = 'NONE' | 'MAIN' | 'GAME_OVER';
export type EntityType = 'item' | 'scenery';
type EffectAction = 'setValue';

type Nullable<T> = T | null;

export interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface MapPosition {
  x: MapCoord;
  y: MapCoord;
}

export interface Door {
  closedImg?: string;
  openImg?: string;
  position?: Position;
  mapPosition: MapPosition;
  dest: number;
  dir: DoorDir;
  state: DoorState;
  description?: string;
  lockedText?: string;
  unlockText?: string;
  openText?: string;
  keyId?: number;
  hidden?: boolean;
  openCondition?: string;
}

interface Effect {
  action: EffectAction;
  parameters: (string | number)[];
}

export interface Verb {
  text?: string;
  moveTo?: number;
  moveDir?: DoorDir;
  addFlags: string[];
  removeFlags: string[];
  prereqFlags: string[];
  prereqUsing?: number;
  effects?: Effect[];
}

export type Verbs = [
  // TODO: TBD how to actually structure this
  Verb,
  Verb,
  Verb,
  Verb,
  Verb,
  Verb,
  Verb,
  Verb
]

export interface Item {
  name: string;
  description: string;
  position?: Position;
  img?: string;
  // TODO: see if this can use genericVerbReducer
  onTake?: string;
  takeableFlag?: string;
  visibleFlag?: string;
  requiresPrecision?: boolean;
  verbs: string[];
}

export interface Scenery {
  name: string;
  description: number;
  startPosition: Position;
  endPosition?: Position;
  img?: string;
  // verbs: Verbs;
  contains: number[];
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
  items: number[];
  scenery: number[];
  gameOver?: boolean;
}

export interface WorldState {
  doors: Door[];
  items: Item[];
  scenery: Scenery[];
  rooms: Room[];
}

export interface PlayerState {
  verb: string;
  using?: number;
  examining: Nullable<number>;
  room: number;
  items: number[];
  page: number;
  timer: number;
}

export type Flags = Set<string>;

export interface GameState {
  worldState: WorldState;
  playerState: PlayerState;
  flags: Flags;
}

export type Entity = Door | Item | Scenery;

export interface GameStoreState extends GameState {
  transition: {
    dest: Nullable<string>
    frame?: number
  };
  text?: string;
  nextText: Nullable<string>,
  loading: boolean,
  menu: Menu;
  cursorEnabled: boolean,
  gameName: string,
}

export type GameStore = Store<GameStoreState>;

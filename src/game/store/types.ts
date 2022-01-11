import { Store } from "redux";

type MapCoord = 0 | 1 | 2 | 3 | 4;
type DoorState = 'CLOSED' | 'OPEN' | 'LOCKED';
type EffectAction = 'setValue';

export type DoorDir = 'UP' | 'DOWN' | 'FORWARD' | 'BACK' | 'LEFT' | 'RIGHT';
export type Menu = 'NONE' | 'MAIN' | 'GAME_OVER';
export type EntityType = 'items' | 'scenery' | 'doors';


export type Nullable<T> = T | null | undefined;

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
  type: 'doors',
  id: number;
  closedImg?: string;
  openImg?: string;
  position?: Position;
  mapPosition: MapPosition;
  dest: number;
  dir: DoorDir;
  state: DoorState;
  description: string;
  closedText?: string;
  lockedText?: string;
  unlockText?: string;
  openText?: string;
  keyId?: number;
  hidden?: boolean;
  openCondition?: string;
  // TODO: Somehow make the shared fields between entities more specific
  verbs: VerbMappings;
}

interface Effect {
  action: EffectAction;
  parameters: (string | number)[];
}

export interface VerbLogic {
  text?: string;
  moveTo?: number;
  moveDir?: DoorDir;
  addFlags: string[];
  removeFlags: string[];
  prereqFlags: string[];
  prereqUsing?: number;
  effects?: Effect[];
}

export type VerbMappings = {
  'MOVE': VerbLogic[],
  'LOOK': VerbLogic[],
  'OPEN': VerbLogic[],
  'USE': VerbLogic[],
  'SMOKE': VerbLogic[],
  'TAKE': VerbLogic[],
  'EAT': VerbLogic[],
  'HIT': VerbLogic[],
  'SPEAK': VerbLogic[]
}

export type VerbIndex = keyof VerbMappings;

export interface Item {
  type: 'items',
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
  verbs: VerbMappings;
}

export interface Scenery {
  type: 'scenery',
  id: number;
  name: string;
  description: string;
  startPosition: Position;
  endPosition?: Position;
  img?: string;
  openText?: string;
  verbs: VerbMappings;
  contains: number[];
  trigger?: string;
  movedText?: string;
  visibleFlag?: string;
}

export interface Room {
  id: number;
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
  verb: VerbIndex;
  using?: Nullable<number>;
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
    dest: Nullable<number>,
    dir: DoorDir,
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

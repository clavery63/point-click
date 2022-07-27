import {
  catchError, switchMapTo, switchMap, map,
} from 'rxjs/operators';
import {
  of, merge, from, Observable, concat, timer,
} from 'rxjs';
import { ofType } from 'redux-observable';
import hydrateState$ from 'shared/observables/hydrateState';
import loadImages$ from 'shared/observables/loadImages';
import { AllActions, MyEpic } from './types';
import { DoorDir, GameState, GameStoreState } from '../types';

type Restart = (
  action$: Observable<AllActions>,
  state: GameState
) => Observable<AllActions>;
const restart$: Restart = (action$, { playerState, worldState }) => {
  const initialRoom = worldState.rooms[playerState.room];
  const { description, initialDescription } = initialRoom;
  return action$.pipe(
    ofType('START_GAME'),
    switchMapTo(concat<AllActions>(
      from([
        { type: 'FADE_TO_MENU', payload: 'NONE' },
        { type: 'SET_WORLD_STATE', payload: worldState },
        { type: 'SET_PLAYER_STATE', payload: playerState },

      ]),
      // Wait for fade to complete for initial room
      timer(1500).pipe(switchMapTo(from([
        { type: 'PLAY_MUSIC', payload: { fileName: initialRoom.music } },
        { type: 'RUN_TEXT', payload: initialDescription || description },
      ]))),
    )),
  );
};

type InitializeGame = (bootInfo: GameStoreState) => GameStoreState;
const initializeGame: InitializeGame = bootInfo => ({
  transition: {
    dest: null,
    dir: DoorDir.UP, // TODO: cleanup transition type requirement
  },
  text: null,
  transient: {
    nextText: null,
    nextMusic: {
      fileName: null,
    },
  },
  loading: false,
  menu: bootInfo.menu || 'MAIN',
  cursorEnabled: true,
  gameName: bootInfo.gameName,
  playerState: bootInfo.playerState,
  worldState: bootInfo.worldState,
  flags: bootInfo.flags,
  // TODO NOW: wtf. is this initializeGame stuff still necessary?
  // Somehow this AND the store.dispatchs in GameRoot are both necessary?
  // Absolutely must fix
  config: bootInfo.config,
  images: new Map(),
});

const boot$: MyEpic = (action$, state$) => {
  return hydrateState$(state$, initializeGame).pipe(
    switchMap(state => loadImages$(state.gameName).pipe(
      map(images => ({
        ...state,
        images,
      })),
    )),
    switchMap(state => merge(
      of<AllActions>({ type: 'SET_STATE', payload: state }),
      restart$(action$, state),
    )),
    catchError(e => {
      console.log('error:', e);
      // TODO: display something even slightly helpful if this happens
      return of<AllActions>({
        type: 'ERROR',
        payload: e,
      });
    }),
  );
};

export default boot$;

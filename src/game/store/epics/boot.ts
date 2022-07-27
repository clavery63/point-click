import {
  catchError, switchMapTo, switchMap, map, filter,
} from 'rxjs/operators';
import {
  of, merge, from, Observable, concat, timer,
} from 'rxjs';
import hydrateState$ from 'shared/observables/hydrateState';
import loadImages$ from 'shared/observables/loadImages';
import { isOfType } from 'typesafe-actions';
import { AllActions, MyEpic } from './types';
import { DoorDir, GameState, GameStoreState } from '../types';

const getMenuAction = (shouldFade: boolean) => {
  if (shouldFade) {
    return { type: 'FADE_TO_MENU', payload: 'NONE' };
  }
  return { type: 'SET_MENU', payload: { current: 'NONE' } };
};

type Restart = (
  action$: Observable<AllActions>,
  state: GameState
) => Observable<AllActions>;
const restart$: Restart = (action$, { playerState, worldState }) => {
  const initialRoom = worldState.rooms[playerState.room];
  const { description, initialDescription } = initialRoom;
  return action$.pipe(
    filter(isOfType('START_GAME')),
    switchMap(({ payload: shouldFade }) => concat<AllActions>(
      from([
        getMenuAction(shouldFade),
        { type: 'SET_WORLD_STATE', payload: worldState },
        { type: 'SET_PLAYER_STATE', payload: playerState },

      ]),
      // Wait for fade to complete for initial room
      timer(shouldFade ? 1500 : 0).pipe(switchMapTo(from([
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
  menu: bootInfo.menu || { current: 'TITLE' },
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

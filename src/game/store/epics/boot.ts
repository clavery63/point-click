import {
  catchError, switchMapTo, switchMap,
} from 'rxjs/operators';
import {
  of, merge, from, Observable, ObservableInput,
} from 'rxjs';
import { ofType } from 'redux-observable';
import hydrateState$ from 'shared/observables/hydrateState';
import { AllActions, MyEpic } from './types';
import { GameState, GameStoreState } from '../types';

type Restart = (
  action$: Observable<AllActions>,
  state: GameState
) => Observable<AllActions>;
const restart$: Restart = (action$, { playerState, worldState }) => {
  const initialRoom = worldState.rooms[playerState.room];
  const { description, initialDescription } = initialRoom;
  return action$.pipe(
    ofType('START_GAME'),
    switchMapTo(from<ObservableInput<AllActions>>([
      { type: 'RUN_TEXT', payload: initialDescription || description },
      { type: 'SET_MENU', payload: 'NONE' },
      { type: 'SET_WORLD_STATE', payload: worldState },
      { type: 'SET_PLAYER_STATE', payload: playerState },
    ])),
  );
};

type InitializeGame = (bootInfo: GameStoreState) => GameStoreState;
const initializeGame: InitializeGame = bootInfo => ({
  transition: {
    dest: null,
    dir: 'UP', // TODO: cleanup transition type requirement
  },
  text: null,
  nextText: null,
  loading: false,
  menu: bootInfo.menu || 'MAIN',
  cursorEnabled: true,
  gameName: bootInfo.gameName,
  playerState: bootInfo.playerState,
  worldState: bootInfo.worldState,
  flags: bootInfo.flags,
  images: new Map(),
});

const boot$: MyEpic = (action$, state$) => {
  return hydrateState$(state$, initializeGame).pipe(
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
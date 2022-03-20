import {
  tap, switchMap, switchMapTo, withLatestFrom,
} from 'rxjs/operators';
import {
  from, of, merge, Observable, ObservableInput,
} from 'rxjs';
import { ofType } from 'redux-observable';
import { AllActions, MyEpic } from './types';
import { GameStoreState } from '../types';

const KEY = 'doublehamburger-save-data';

type SaveGame = (g: GameStoreState) => void;
const saveGame: SaveGame = ({ worldState, playerState, flags }) => {
  localStorage.setItem(KEY, JSON.stringify({
    worldState,
    playerState,
    flags: [...flags],
  }));
};

type LoadGame = () => Observable<AllActions>;
const loadGame$: LoadGame = () => {
  const newState = localStorage.getItem(KEY);
  if (!newState) {
    return of({ type: 'NULL' });
  }

  const { worldState, playerState, flags }: GameStoreState = JSON.parse(newState);

  return from<ObservableInput<AllActions>>([
    { type: 'SET_WORLD_STATE', payload: worldState },
    { type: 'SET_PLAYER_STATE', payload: playerState },
    { type: 'SET_FLAGS', payload: flags },
    { type: 'SET_MENU', payload: 'NONE' },
    {
      type: 'PLAY_MUSIC',
      payload: {
        fileName: worldState.rooms[playerState.room].music,
      },
    },
  ]);
};

const save$: MyEpic = (action$, state$, { runText$ }) => {
  const saveGame$ = action$.pipe(
    ofType('SAVE_GAME'),
    withLatestFrom(state$),
    tap(([, state]) => saveGame(state)),
    switchMapTo(runText$('Game Saved Successfully!')),
  );

  const load$ = action$.pipe(
    ofType('LOAD_GAME'),
    withLatestFrom(state$),
    switchMap(() => loadGame$()),
  );

  return merge(saveGame$, load$);
};

export default save$;

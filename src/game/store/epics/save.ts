import {
  tap, switchMap, switchMapTo, withLatestFrom,
} from 'rxjs/operators';
import {
  from, of, merge, Observable, ObservableInput,
} from 'rxjs';
import { ofType } from 'redux-observable';
import { AllActions, MyEpic } from './types';
import { GameStoreState } from '../types';

export const getSaveDataKey = (gameName: string) => `point-click-save-data/${gameName}`;

type SaveGame = (g: GameStoreState) => void;
const saveGame: SaveGame = ({
  worldState, playerState, flags, gameName,
}) => {
  localStorage.setItem(getSaveDataKey(gameName), JSON.stringify({
    worldState,
    playerState,
    flags: [...flags],
  }));
};

type LoadGame = (gameName: string) => Observable<AllActions>;
const loadGame$: LoadGame = gameName => {
  const newState = localStorage.getItem(getSaveDataKey(gameName));
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
    switchMap(([, { gameName }]) => loadGame$(gameName)),
  );

  return merge(saveGame$, load$);
};

export default save$;

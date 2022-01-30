import {
  tap, switchMap, switchMapTo, withLatestFrom,
} from 'rxjs/operators';
import {
  from, of, merge, Observable, ObservableInput,
} from 'rxjs';
import { ofType } from 'redux-observable';
import { MyEpic } from './types';
import { GameStoreState } from '../types';
import { ReducerActions } from '../reducers/rootReducer';

const KEY = 'doublehamburger-save-data';

type SaveGame = (g: GameStoreState) => void;
const saveGame: SaveGame = ({ worldState, playerState, flags }) => {
  localStorage.setItem(KEY, JSON.stringify({
    worldState,
    playerState,
    flags: [...flags],
  }));
};

type LoadGame = () => Observable<ReducerActions>;
const loadGame$: LoadGame = () => {
  const newState = localStorage.getItem(KEY);
  if (!newState) {
    return of({ type: 'NULL' });
  }

  // TODO: create a smart JSON parser that throws if the state is invalid
  const { worldState, playerState, flags }: GameStoreState = JSON.parse(newState);

  return from<ObservableInput<ReducerActions>>([
    { type: 'SET_WORLD_STATE', payload: worldState },
    { type: 'SET_PLAYER_STATE', payload: playerState },
    { type: 'SET_FLAGS', payload: new Set(flags) },
    { type: 'SET_MENU', payload: 'NONE' },
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

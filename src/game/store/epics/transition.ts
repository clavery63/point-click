import {
  mapTo, switchMap, mergeMap, concatMap, withLatestFrom, take, filter,
} from 'rxjs/operators';
import {
  from, timer, concat, of, NEVER, Observable,
} from 'rxjs';
import { range } from 'lodash';
import { ofType } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { AllActions, MyEpic } from './types';
import { GameStoreState } from '../types';
import { ActionsType } from '../reducers/rootReducer';
import { when } from './util';

const MS_PER_FRAME = 65;

const getAction$ = (dest: number) => (frame: number) => {
  return from([
    when(frame === 0, { type: 'SET_CURSOR_ENABLED', payload: false }),
    when(frame === 14, { type: 'SET_CURSOR_ENABLED', payload: true }),
    when(frame === 7, { type: 'SET_ROOM', payload: dest }),
    when(true, { type: 'SET_FRAME', payload: frame % 14 }),
    when(frame === 0 || frame === 7, { type: 'PLAY_SFX' }),
  ]);
};

type TextRunner = (t: string) => Observable<ActionsType['SET_TEXT']>;
type DispatchRoom = (d: number, s: GameStoreState, r: TextRunner) => Observable<AllActions>;
const dispatchRoom: DispatchRoom = (dest, state, runText$) => {
  const { worldState, playerState } = state;
  const room = worldState.rooms[dest];
  if (!room.description) {
    return of({ type: 'NULL' });
  }

  if (playerState.timer === 17) {
    return of({ type: 'RUN_TRANSITION', payload: { dest: 11, dir: 'FORWARD', frame: 0 } });
  }

  return concat(
    of(when(!!room.gameOver || !!room.music, {
      type: 'PLAY_MUSIC',
      payload: {
        fileName: room.music || 'puppets.mp3',
      },
    })),
    runText$(room.initialDescription || room.description),
  );
};

type CheckGameOver = (d: number, s: GameStoreState, p: Observable<any>) => Observable<AllActions>;
const checkGameOver: CheckGameOver = (dest, state, pageClick$) => {
  const { worldState } = state;
  const room = worldState.rooms[dest];
  if (!room.gameOver) {
    return NEVER;
  }

  return pageClick$.pipe(
    // TODO: yeah, you're reading this right. using that `when` function as a passthru
    // Allows the typechecker to confirm this is valid. Find a better way? :(
    mapTo(when(true, {
      type: 'SET_MENU',
      payload: 'GAME_OVER',
    })),
    take(1),
  );
};

const transition$: MyEpic = (action$, state$, { runText$ }) => {
  return action$.pipe(
    filter(isOfType('RUN_TRANSITION')),
    withLatestFrom(state$),
    switchMap(([{ payload }, state]) => concat(
      from(range(15)).pipe(
        concatMap(frame => timer(MS_PER_FRAME).pipe(mapTo(frame))),
        mergeMap(getAction$(payload.dest)),
      ),
      from(dispatchRoom(payload.dest, state, runText$)),
      checkGameOver(payload.dest, state, action$.pipe(ofType('PAGE_CLICK'))),
    )),
  );
};

export default transition$;

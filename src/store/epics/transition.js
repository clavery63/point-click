import { mapTo, switchMap, mergeMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { from, timer, concat, of } from 'rxjs';
import { range } from 'lodash';
import { ofType } from 'redux-observable';

const MS_PER_FRAME = 65;

const getCursorAction = frame => {
  if (frame === 0) {
    return { type: 'SET_CURSOR_ENABLED', payload: false };
  }
  if (frame === 14) {
    return { type: 'SET_CURSOR_ENABLED', payload: true };
  }
  return { type: null };
};

const getAction$ = ({ dest }) => frame => {
  const setRoomType = frame === 7 ? 'SET_ROOM' : null;
  const sfxType = frame === 0 || frame === 7 ? 'PLAY_SFX' : null;
  return from([
    getCursorAction(frame),
    { type: setRoomType, payload: dest },
    { type: 'SET_FRAME', payload: frame % 14 },
    { type: sfxType, payload: 'transition.mp3' }
  ]);
};

const dispatchRoom = (dest, state, runText$) => {
  const { gameState, playerState } = state;
  const room = gameState.rooms[dest];
  if (!room.description) {
    return { type: null }
  }

  if (playerState.bagLevel === 17) {
    return of({ type: 'RUN_TRANSITION', payload: { dest: 11, dir: 'FORWARD', frame: 0 } });
  }

  const gameOverAudioType = (room.gameOver || room.music) ? 'PLAY_MUSIC' : null;
  const fileName = room.music || 'puppets.mp3';
  return concat(
    of(({ type: gameOverAudioType, payload: { fileName }})),
    runText$(room.initialDescription || room.description),
    of(({ type: 'SET_CURSOR_ENABLED', payload: !room.gameOver }))
  );
}

const transition$ = (action$, state$, { runText$ }) => {
  return action$.pipe(
    ofType('RUN_TRANSITION'),
    withLatestFrom(state$),
    switchMap(([{ payload }, state]) => concat(
      from(range(15)).pipe(
        concatMap(frame => timer(MS_PER_FRAME).pipe(mapTo(frame))),
        mergeMap(getAction$(payload))
      ),
      from(dispatchRoom(payload.dest, state, runText$)),
    ))
  );
};

export default transition$;

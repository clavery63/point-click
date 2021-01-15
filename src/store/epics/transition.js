import { mapTo, switchMap, mergeMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { from, timer, concat, of } from 'rxjs';
import { range } from 'lodash';
import { ofType } from 'redux-observable';
import runText$ from './observables/runText';

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
  return from([
    getCursorAction(frame),
    { type: setRoomType, payload: dest },
    { type: 'SET_FRAME', payload: frame % 14 }
  ]);
};

const dispatchRoomText = (action$, { dest }, { rooms }) => {
  const room = rooms[dest];
  if (!room.description) {
    return { type: null }
  }
  return concat(
    runText$(action$)(room.initialDescription || room.description),
    of(({ type: 'SET_CURSOR_ENABLED', payload: !room.gameOver }))
  );
}

const transition$ = (action$, state$) => {
  return action$.pipe(
    ofType('RUN_TRANSITION'),
    withLatestFrom(state$),
    switchMap(([{ payload }, { gameState }]) => concat(
      from(range(15)).pipe(
        concatMap(frame => timer(MS_PER_FRAME).pipe(mapTo(frame))),
        mergeMap(getAction$(payload))
      ),
      from(dispatchRoomText(action$, payload, gameState)),
    ))
  );
};

export default transition$;

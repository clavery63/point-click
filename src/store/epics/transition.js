import { mapTo, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators';
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
  return from([
    getCursorAction(frame),
    { type: setRoomType, payload: dest },
    { type: 'SET_FRAME', payload: frame % 14 }
  ]);
};

const dispatchRoomText = ({ dest }, { rooms }) => {
  const room = rooms[dest];
  if (!room.description) {
    return { type: null }
  }
  return {
    type: 'RUN_TEXT',
    payload: room.description
  };
}

const transition$ = (action$, state$) => {
  return action$.pipe(
    ofType('RUN_TRANSITION'),
    withLatestFrom(state$),
    switchMap(([{ payload }, { gameState }]) => concat(
      from(range(15)).pipe(
        mergeMap(frame => timer(MS_PER_FRAME * frame).pipe(mapTo(frame))),
        mergeMap(getAction$(payload))
      ),
      of(dispatchRoomText(payload, gameState))
    ))
  );
};

export default transition$;

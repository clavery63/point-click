import { mapTo, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from, timer } from 'rxjs';
import { range } from 'lodash';
import { ofType } from 'redux-observable';

const MS_PER_CHAR = 65;

const updateMouseState = frame => {
  if (frame === 0) {
    document.querySelector('canvas').classList.add('mouse-disabled');
  }
  if (frame === 13) {
    document.querySelector('canvas').classList.remove('mouse-disabled');
  }
};

const getAction$ = ({ dest }) => frame => {
  const setRoomType = frame === 7 ? 'SET_ROOM' : null;
  return from([
    { type: setRoomType, payload: dest },
    { type: 'SET_FRAME', payload: frame }
  ]);
};

const transition$ = action$ => {
  return action$.pipe(
    ofType('RUN_TRANSITION'),
    switchMap(({ payload }) => from(range(14)).pipe(
      mergeMap(frame => timer(MS_PER_CHAR * frame).pipe(mapTo(frame))),
      tap(updateMouseState),
      mergeMap(getAction$(payload))
    ))
  );
};

export default transition$;

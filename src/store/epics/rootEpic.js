import { filter, map, scan, mapTo, switchMap, concatMap, tap } from 'rxjs/operators';
import { interval, from, timer } from 'rxjs';

const rootEpic = action$ => {
  return action$.pipe(
    filter(({ type }) => type === 'RUN_TEXT'),
    switchMap(({ payload }) => from(payload.split(''))),
    concatMap(char => timer(100).pipe(mapTo(char))),
    scan((acc, cur) => acc + cur, ''),
    map(text => ({ type: 'SET_TEXT', payload: text }))
  );
};

export default rootEpic;

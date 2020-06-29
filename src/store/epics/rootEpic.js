import { filter, map, scan, startWith, takeWhile, switchMapTo } from 'rxjs/operators';
import { interval } from 'rxjs';

const rootEpic = action$ => {
  return action$.pipe(
    filter(({ type }) => type === 'EXPAND'),
    switchMapTo(
      interval(20).pipe(
        scan((acc, cur) => acc + 10, 50),
        takeWhile(x => x < 200)
      )
    ),
    map(x => ({ type: 'SET_WIDTH', payload: x }))
  );
};

export default rootEpic;

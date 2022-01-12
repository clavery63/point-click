import { filter, switchMap } from 'rxjs/operators';
// TODO: see how big this library is. Should we implement it ourselves?
import { isOfType } from 'typesafe-actions';
import { MyEpic } from './types';

const text$: MyEpic = (action$, state$, { runText$ })  => {
  return action$.pipe(
    filter(isOfType('RUN_TEXT')),
    switchMap(({ payload }) => runText$(payload))
  );
};

export default text$;

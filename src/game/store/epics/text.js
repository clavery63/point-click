import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

const text$ = (action$, state$, { runText$ })  => {
  return action$.pipe(
    ofType('RUN_TEXT'),
    switchMap(({ payload }) => runText$(payload))
  );
};

export default text$;

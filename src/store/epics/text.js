import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import runText$ from './observables/runText';

const text$ = action$ => {
  return action$.pipe(
    ofType('RUN_TEXT'),
    switchMap(({ payload }) => runText$(action$)(payload))
  );
};

export default text$;

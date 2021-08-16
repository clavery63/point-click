import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import hydrateState$ from '../../../shared/observables/hydrateState';

const initializeState = bootInfo => {
  return {
    gameName: bootInfo.gameName
  };
};

const load$ = (action$, state$) => {
  return hydrateState$(state$, initializeState).pipe(
    switchMap(state => from([
      ({ type: null })
    ]))
  )
};

export default load$;

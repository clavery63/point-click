import { map } from 'rxjs/operators';
import hydrateState$ from 'shared/observables/hydrateState';
import { setGameState } from 'admin/store/sharedActions';

const initializeState = bootInfo => {
  return {
    gameName: bootInfo.gameName
  };
};

const load$ = (action$, state$) => {
  return hydrateState$(state$, initializeState).pipe(
    map(setGameState)
  )
};

export default load$;

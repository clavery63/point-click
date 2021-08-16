import { map } from 'rxjs/operators';
import hydrateState$ from 'shared/observables/hydrateState';

const initializeState = bootInfo => {
  return {
    gameName: bootInfo.gameName
  };
};

const load$ = (action$, state$) => {
  return hydrateState$(state$, initializeState).pipe(
    map(state => ({ type: 'SET_GAME_STATE', payload: state }))
  )
};

export default load$;

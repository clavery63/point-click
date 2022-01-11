import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import loadImages$ from './loadImages';

const assetsBase = process.env.REACT_APP_ASSETS_BASE;

const loadPlayerAndGameState$ = initialState => {
  if (initialState?.worldState?.rooms?.length > 0) {
    // If there are rooms, we've already fetched the data
    return of(initialState);
  }

  const dataSource = `${assetsBase}/${initialState.gameName}/gamedata.json`;
  return fromFetch(dataSource).pipe(
    // TODO: render something useful if the response is no good
    switchMap(resp => resp.json()),
    map(({ playerState, worldState, flags }) => ({
      ...initialState,
      playerState,
      worldState,
      flags,
    }))
  );
};

const hydrateState$ = (state$, initialize) => {
  return state$.pipe(
    take(1),
    map(initialize),
    switchMap(loadPlayerAndGameState$),
    switchMap(state => loadImages$(state.gameName).pipe(
      map(images => ({
        ...state,
        images
      }))
    ))
  );
};

export default hydrateState$;

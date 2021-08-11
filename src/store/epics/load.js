import { map, switchMapTo, switchMap } from 'rxjs/operators';
import { Observable, of, forkJoin, merge, from } from 'rxjs';
import { ofType } from 'redux-observable';
import initialState from '../initialState';
import imageFiles from '../../images';

const image$ = src => new Observable(observer => {
  const image = new Image();
  const load = () => {
    observer.next(image);
    observer.complete();
  };
  const error = e => {
    console.error(e);
    observer.error(e);
  }
  image.addEventListener('load', load);
  image.addEventListener('error', error);
  image.src = src;
  return () => {
    image.removeEventListener('load', load);
    image.removeEventListener('error', error);
  }
});

const withImages = state => pairs => ({
  ...state,
  images: pairs.reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {})
});

const loadImages$ = state => {
  return forkJoin(Object.keys(imageFiles).map(key => {
    return image$(imageFiles[key]).pipe(map(image => [key, image]));
  })).pipe(map(withImages(state)));
};

const loadFlagsSet = state => {
  return {
    ...state,
    flags: new Set(state.flags)
  };
};

const restart$ = (action$, { playerState, gameState }) => {
  const initialRoom = gameState.rooms[playerState.room];
  const { description, initialDescription } = initialRoom;
  return action$.pipe(
    ofType('START_GAME'),
    switchMapTo(from([
      { type: 'RUN_TEXT', payload: initialDescription || description },
      { type: 'SET_MENU', payload: 'NONE' },
      { type: 'SET_GAME_STATE', payload: initialState.gameState },
      { type: 'SET_PLAYER_STATE', payload: initialState.playerState },
    ]))
  );
};

const initializeUiState = () => ({
  transition: {
    dest: null
  },
  text: null,
  nextText: null,
  loading: false,
  menu: 'MAIN'
});

const loadPlayerAndGameState$ = uiState => {
    /**
   * Once this is customizable outside of the codebase, we will optionally
   * get this initial state from a network request.
   */
  return of(initialState).pipe(
    map(({ playerState, gameState, flags }) => ({
      ...uiState,
      playerState,
      gameState,
      flags
    }))
  );
}

const load$ = action$ => {
  const initialUiState = initializeUiState();
  return loadPlayerAndGameState$(initialUiState).pipe(
    switchMap(loadImages$),
    map(loadFlagsSet),
    switchMap(state => merge(
      of({ type: 'SET_STATE', payload: state }),
      restart$(action$, state)
    ))
  );
};

export default load$;

import { map, mapTo, switchMap } from 'rxjs/operators';
import { Observable, of, forkJoin, merge } from 'rxjs';
import { ofType } from 'redux-observable';
import initialState from '../initialState';
import imageFiles from '../../images';

const TEMP_initialText = 'Hi Mike. Welcome to birthday castle. We hope you find it comfortable inside.               And who knows? You might even see some cool s*** along the way.'

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
  gameState: {
    ...state.gameState,
    images: pairs.reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value
    }), {})
  }
});

const loadImages$ = state => {
  return forkJoin(Object.keys(imageFiles).map(key => {
    return image$(imageFiles[key]).pipe(map(image => [key, image]));
  })).pipe(map(withImages(state)));
};

const setState$ = startGame$ => state => {
  return merge(
    of(state),
    startGame$.pipe(
      mapTo({
        ...state,
        nextText: TEMP_initialText,
        menu: 'NONE'
      })
    )
  );
}

const load$ = action$ => {
  /**
   * Once this is customizable outside of the codebase, we will optionally
   * get this initial state from a network request.
   */
  const initialState$ = of(initialState);
  return initialState$.pipe(
    switchMap(loadImages$),
    switchMap(setState$(action$.pipe(ofType('START_GAME')))),
    map(state => ({ type: 'SET_STATE', payload: state }))
  );
};

export default load$;

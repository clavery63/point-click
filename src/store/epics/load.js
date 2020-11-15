import { map, switchMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
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
  gameState: {
    ...state.gameState,
    images: pairs.reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value
    }))
  }
});

const loadImages$ = state => {
  return forkJoin(Object.keys(state.gameState.images).map(key => {
    return image$(imageFiles[key]).pipe(map(image => [key, image]));
  })).pipe(map(withImages(state)));
};

const load$ = () => {
  /**
   * Once this is customizable outside of the codebase, we will optionally
   * get this initial state from a network request.
   */
  const initialState$ = of(initialState);
  return initialState$.pipe(
    switchMap(loadImages$),
    map(state => ({ type: 'SET_STATE', payload: state }))
  );
};

export default load$;

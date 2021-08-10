import { map, switchMap, filter, take, mapTo } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { ofType } from 'redux-observable';

const getPixels = ({ stage, scaleX, scaleY }) => () => {
  const position = stage.getPointerPosition();
  if (!position) {
    return null;
  }
  return {
    x: Math.round(position.x / scaleX),
    y: Math.round(position.y / scaleY)
  };
};

const cursor$ = action$ => {
  const cursorMove$ = action$.pipe(
    ofType('STAGE_DATA'),
    switchMap(({ payload }) => fromEvent(window, 'mousemove').pipe(
      map(getPixels(payload))
    )),
    filter(Boolean),
  );

  const activate$ = cursorMove$.pipe(
    take(1),
    mapTo({ type: 'SET_CURSOR_ENABLED', payload: true })
  );
  
  const setPosition$ = cursorMove$.pipe(
    map(payload => ({ type: 'SET_CURSOR_POSITION', payload }))
  );

  return merge(activate$, setPosition$);
};

export default cursor$;

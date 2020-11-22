import { map, switchMap, startWith, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
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
  return action$.pipe(
    ofType('STAGE_DATA'),
    switchMap(({ payload }) => fromEvent(window, 'mousemove').pipe(
      map(getPixels(payload)),
      startWith({ x: 128, y: 120 })
    )),
    filter(Boolean),
    map(coords => ({ 
      type: 'SET_CURSOR', 
      payload: { ...coords, enabled: true } 
    }))
  );
};

export default cursor$;

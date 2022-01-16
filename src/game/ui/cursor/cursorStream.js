import { map, filter, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

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

const cursor$ = stageData => {
  return fromEvent(window, 'mousemove').pipe(
    map(getPixels(stageData)),
    filter(Boolean),
    // NOTE: This is how we disable the cursor on mobile.
    takeUntil(fromEvent(window, 'touchstart'))
  );
};

export default cursor$;

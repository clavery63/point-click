import { map, filter } from 'rxjs/operators';
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
  );
};

export default cursor$;

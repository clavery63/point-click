import { map, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { Vector2d } from 'konva/types/types';
import { StageData } from './Cursor';

const getPixels = ({ stage, scaleX, scaleY }: StageData) => () => {
  const position = stage.getPointerPosition();
  if (!position) {
    return { x: -10, y: -10 }; // Render the cursor offscreen
  }
  return {
    x: Math.round(position.x / scaleX),
    y: Math.round(position.y / scaleY),
  };
};

type Cursor = (stageData: StageData) => Observable<Vector2d>
const cursor$: Cursor = stageData => {
  return fromEvent(window, 'mousemove').pipe(
    map(getPixels(stageData)),
    // NOTE: This is how we disable the cursor on mobile.
    takeUntil(fromEvent(window, 'touchstart')),
  );
};

export default cursor$;

import { map, switchMap, concatMapTo, withLatestFrom, filter, scan } from 'rxjs/operators';
import { from, timer, concat, of } from 'rxjs';
import { range, isEqual } from 'lodash';
import { ofType } from 'redux-observable';

/**
 * TODO: make NUM_FRAMES and possibly MS_PER_FRAME adjustable from initialState
 */
const NUM_FRAMES = 12;
const MS_PER_FRAME = 200;

const shouldAnimate = ([{ payload }, { worldState, playerState }]) => {
  const { id, type } = payload;
  const object = worldState[type][id];
  const hasAnimated = isEqual(object.currentPosition, object.endPosition);
  const isTriggered = playerState.verb === object.trigger;
  return isTriggered && !hasAnimated;
};

const withStepSizes = ([{ payload }, { worldState }]) => {
  const { id, type } = payload;
  const object = worldState[payload.type][payload.id];
  const { startPosition, endPosition } = object;
  const xStep = (endPosition.left - startPosition.left) / NUM_FRAMES;
  const yStep = (endPosition.top - startPosition.top) / NUM_FRAMES;
  return { object, id, type, xStep, yStep };
};

const runAnimation$ = ({ object, id, type, xStep, yStep }) => {
  const { left: startX, top: startY } = object.startPosition;
  return concat(
    of({ type: 'SET_CURSOR_ENABLED', payload: false }),
    from(range(NUM_FRAMES)).pipe(
      concatMapTo(timer(MS_PER_FRAME)),
      scan(([x, y]) => [Math.round(x + xStep), Math.round(y + yStep)], [startX, startY]),
      map(([x, y]) => ({ 
        type: 'SET_POSITION', 
        payload: { id, type, x, y } 
      }))
    ),
    of({ type: 'SET_CURSOR_ENABLED', payload: true }),
    of({ type: 'RUN_TEXT', payload: object.movedText })
  )
};

const animation$ = (action$, state$) => {
  return action$.pipe(
    ofType('SELECT_OBJECT'),
    withLatestFrom(state$),
    filter(shouldAnimate),
    map(withStepSizes),
    switchMap(runAnimation$)
  );
};

export default animation$;

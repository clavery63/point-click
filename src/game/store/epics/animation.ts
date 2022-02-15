import {
  map, switchMap, concatMapTo, withLatestFrom, filter, scan,
} from 'rxjs/operators';
import {
  from, timer, concat, of, Observable,
} from 'rxjs';
import range from 'lodash/range';
import isEqual from 'lodash/isEqual';
import { isOfType } from 'typesafe-actions';
import { AllActions, MyEpic } from './types';
import { GameStoreState, Scenery } from '../types';
import { typedAction } from './util';

/**
 * TODO: make NUM_FRAMES and possibly MS_PER_FRAME adjustable from initialState
 */
const NUM_FRAMES = 12;
const MS_PER_FRAME = 200;

type Input = [number, GameStoreState];

type ShouldAnimate = (i: Input) => boolean;
const shouldAnimate: ShouldAnimate = ([id, { worldState, playerState }]) => {
  const object = worldState.entities[id];
  if (object.type !== 'scenery') return false;
  const hasAnimated = isEqual(object.position, object.endPosition);
  const isTriggered = playerState.verb === object.trigger;
  return isTriggered && !hasAnimated;
};

type WithStepSizes = (i: Input) => AnimationData;
const withStepSizes: WithStepSizes = ([id, { worldState }]) => {
  // TODO: perhaps make it so everything in this file happens ony for things that
  // have these properties so we don't need to do these type checks/casts
  const object = worldState.entities[id] as Scenery;
  const { startPosition, endPosition } = object;
  // TODO: endPosition can be undefined. Perhaps we can intelligently make
  // A subtype of Scenery that is animatable. Alternatively, just set
  // endPotition to startPosition as a default when loading the game
  const xStep = ((endPosition?.left ?? 0) - startPosition.left) / NUM_FRAMES;
  const yStep = ((endPosition?.top ?? 0) - startPosition.top) / NUM_FRAMES;
  return {
    object, id, xStep, yStep,
  };
};

type AnimationData = {
  object: Scenery;
  id: number;
  xStep: number;
  yStep: number;
};
type RunAnimation = (r: AnimationData) => Observable<AllActions>;
const runAnimation$: RunAnimation = ({
  object, id, xStep, yStep,
}) => {
  const { left: startX, top: startY } = object.startPosition;
  return concat(
    of(typedAction({ type: 'SET_CURSOR_ENABLED', payload: false })),
    from(range(NUM_FRAMES)).pipe(
      concatMapTo(timer(MS_PER_FRAME)),
      scan(([x, y]) => [Math.round(x + xStep), Math.round(y + yStep)], [startX, startY]),
      map(([x, y]) => typedAction({
        type: 'SET_POSITION',
        payload: {
          id, x, y,
        },
      })),
    ),
    of(typedAction({ type: 'SET_CURSOR_ENABLED', payload: true })),
    // TODO: Ensure empty string doesn't just open up an empty dialog
    of(typedAction({ type: 'RUN_TEXT', payload: object.movedText || '' })),
  );
};

const animation$: MyEpic = (action$, state$) => {
  return action$.pipe(
    filter(isOfType('SELECT_OBJECT')),
    map(({ payload }) => payload),
    withLatestFrom(state$),
    filter(shouldAnimate),
    map(withStepSizes),
    switchMap(runAnimation$),
  );
};

export default animation$;

import {
  map, switchMap, concatMapTo, withLatestFrom, filter, scan,
} from 'rxjs/operators';
import {
  from, timer, concat, of, Observable,
} from 'rxjs';
import { range, isEqual } from 'lodash';
import { isOfType } from 'typesafe-actions';
import { AllActions, MyEpic } from './types';
import { GameStoreState, Scenery } from '../types';
import { typedAction } from './util';

/**
 * TODO: make NUM_FRAMES and possibly MS_PER_FRAME adjustable from initialState
 */
const NUM_FRAMES = 12;
const MS_PER_FRAME = 200;

type SceneryType = { type: 'scenery', id: number };
type Input = [SceneryType, GameStoreState];

type ShouldAnimate = (i: Input) => boolean;
const shouldAnimate: ShouldAnimate = ([payload, { worldState, playerState }]) => {
  const { id, type } = payload;
  if (type !== 'scenery') return false;
  const object = worldState[type][id];
  const hasAnimated = isEqual(object.currentPosition, object.endPosition);
  const isTriggered = playerState.verb === object.trigger;
  return isTriggered && !hasAnimated;
};

type WithStepSizes = (i: Input) => AnimationData;
const withStepSizes: WithStepSizes = ([payload, { worldState }]) => {
  const { id, type } = payload;
  const object = worldState[payload.type][payload.id];
  const { startPosition, endPosition } = object;
  // TODO: endPosition can be undefined. Perhaps we can intelligently make
  // A subtype of Scenery that is animatable. Alternatively, just set
  // endPotition to startPosition as a default when loading the game
  const xStep = ((endPosition?.left ?? 0) - startPosition.left) / NUM_FRAMES;
  const yStep = ((endPosition?.top ?? 0) - startPosition.top) / NUM_FRAMES;
  return {
    object, id, type, xStep, yStep,
  };
};

type AnimationData = {
  object: Scenery,
  id: number,
  type: 'scenery',
  xStep: number,
  yStep: number
}
type RunAnimation = (r: AnimationData) => Observable<AllActions>;
const runAnimation$: RunAnimation = ({
  object, id, type, xStep, yStep,
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
          id, type, x, y,
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
    // TODO: ok, so here what we want is for the type system to be able to infer
    // that the only possible type after filtering is SceneryType, but alas, we
    // need the horrible map after
    filter(({ payload }) => payload.type === 'scenery'),
    map(({ payload }) => payload as SceneryType),
    withLatestFrom(state$),
    filter(shouldAnimate),
    map(withStepSizes),
    switchMap(runAnimation$),
  );
};

export default animation$;

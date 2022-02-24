import { DoorDir } from 'game/store/types';

export const GRID_SIZE = 14;
const HALF_GRID = GRID_SIZE / 2;

type TransformerFn = (x: number, y: number) => [number, number];
type Arrow = (transformer: TransformerFn) => TransitionFn;
const arrow: Arrow = transform => (origX, origY, frame) => {
  const [x, y] = transform(origX, origY);
  const shift = y < HALF_GRID ? y : 13 - y;
  const shifted = x - shift + HALF_GRID;
  return shifted % HALF_GRID < frame ? 1 : 0;
};

const pinwheel: TransitionFn = (origX, origY, frame) => {
  const x = -(origX - HALF_GRID);
  const y = origY - HALF_GRID;
  if (y === 0 || x === 0) {
    return 1;
  }
  const angle = ((Math.PI / 2) / 7) * frame;
  const ratio = Math.tan(angle);
  const [num, den] = (x * y > 0) ? [x, y] : [y, x];
  return Math.abs(num / den) < ratio ? 1 : 0;
};

const boxes: TransitionFn = (origX, origY, origFrame) => {
  const x = Math.abs(origX - HALF_GRID + 0.5);
  const y = Math.abs(origY - HALF_GRID + 0.5);
  const frame = 6 - origFrame;
  return (x > frame && y > frame) ? 1 : 0;
};

type TransitionFn = (x: number, y: number, frame: number) => 0 | 1;
const transitions: Record<DoorDir, TransitionFn> = {
  [DoorDir.RIGHT]: arrow((x, y) => ([x, y])),
  [DoorDir.LEFT]: arrow((x, y) => ([-x + 13, y])),
  [DoorDir.UP]: arrow((x, y) => ([-y + 13, x])),
  [DoorDir.DOWN]: arrow((x, y) => ([y, x])),
  [DoorDir.FORWARD]: pinwheel,
  [DoorDir.BACK]: boxes,
};

type WithInverse = (transition: TransitionFn, x: number, y: number, frame: number) => 0 | 1;
const withInverse: WithInverse = (transition, x, y, frame) => {
  return (frame > HALF_GRID)
    ? (transition(x, y, frame - HALF_GRID) ^ 1) as 0 | 1
    : transition(x, y, frame);
};

const createGrid = (direction: DoorDir) => (frame: number) => {
  return new Array(GRID_SIZE)
    .fill(new Array(GRID_SIZE).fill(0))
    // Typescript is too stupid to figure out that `row` is provably a number[]
    .map((row, y) => (row as (0 | 1)[]).map((elem, x) => {
      return withInverse(transitions[direction], x, y, frame);
    }));
};

export const directions = Object.keys(transitions);

export default createGrid;

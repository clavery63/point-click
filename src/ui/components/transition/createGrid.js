const GRID_SIZE = 14;
const HALF_GRID = GRID_SIZE / 2;

const arrow = transform => (origX, origY, frame) => {
  const [x, y] = transform(origX, origY);
  const shift = y < HALF_GRID ? y : 13 - y;
  const shifted = x - shift + HALF_GRID;
  return shifted % HALF_GRID < frame ? 1 : 0;
};

const pinwheel = (origX, origY, frame) => {
  const x = -(origX - HALF_GRID);
  const y = origY - HALF_GRID;
  if (y === 0 || x === 0) {
    return 1;
  } else {
    const angle = ((Math.PI / 2) / 7) * frame;
    const ratio = Math.tan(angle);
    const [num, den] = (x * y > 0) ? [x, y] : [y, x];
    return Math.abs(num / den) < ratio ? 1 : 0;
  }
};

const boxes = (origX, origY, origFrame) => {
  const x = Math.abs(origX - HALF_GRID);
  const y = Math.abs(origY - HALF_GRID);
  const frame = 7 - origFrame;
  return (x > frame && y > frame) ? 1 : 0;
};

const transitions = {
  RIGHT: arrow((x, y) => ([x, y])),
  LEFT:  arrow((x, y) => ([-x + 13, y])),
  UP:    arrow((x, y) => ([-y + 13, x])),
  DOWN:  arrow((x, y) => ([y, x])),
  FORWARD: pinwheel,
  BACK: boxes
};

const withInverse = (transition, x, y, frame) => {
  return (frame > HALF_GRID)
    ? transition(x, y, frame - HALF_GRID) ^ 1
    : transition(x, y, frame);
};

const createGrid = (frame, direction) => {
  return new Array(GRID_SIZE)
    .fill(new Array(GRID_SIZE).fill(0))
    .map((row, y) => row.map((elem, x) => {
      return withInverse(transitions[direction], x, y, frame);
    }));
};

export default createGrid;

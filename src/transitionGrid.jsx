import React from 'react';

const GRID_SIZE = 14;
const SQUARE_SIZE = 100 / GRID_SIZE;

const transforms = {
  RIGHT: (x, y) => ([x, y]),
  LEFT:  (x, y) => ([-x + 13, y]),
  UP:    (x, y) => ([-y + 13, x]),
  DOWN:  (x, y) => ([y, x])
};

const createGrid = (frame, direction) => {
  return new Array(GRID_SIZE)
    .fill(new Array(GRID_SIZE).fill(0))
    .map((row, y) => row.map((elem, x) => {
      return getVal(...transforms[direction](x, y), frame);
    }))
};

const getVal = (x, y, frame) => {
  if (frame > 7) {
    return getVal(x, y, frame - 7) ^ 1;
  }
  const shift = y <= 6 ? y : 13 - y;
  const shifted = x - shift + 7;
  return shifted % 7 < frame ? 1 : 0;
}

const renderSquare = (x, y, val) => {
  const style = {
    position: 'absolute',
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    left: `${SQUARE_SIZE * x}%`,
    top: `${SQUARE_SIZE * y}%`,
    'background-color': 'black',
    opacity: val
  }
  return <div className='grid-square' style={style}></div>
}

const TransitionGrid = ({ frame, direction }) => {
  const grid = createGrid(frame, direction);

  return (
    <div className='transition-grid'>
      {grid.map((row, y) =>
        row.map((val, x) => renderSquare(x, y, val))
      )}
    </div>
  )
};

export default TransitionGrid;

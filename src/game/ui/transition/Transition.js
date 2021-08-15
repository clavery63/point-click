import React from 'react';
import { Group, Rect } from 'react-konva';
import range from 'lodash/range';
import createGrid, { GRID_SIZE, directions } from './createGrid';

const grids = directions.reduce((dict, dir) => ({
  ...dict,
  [dir]: range(GRID_SIZE).map(frame => {
    return createGrid(frame, dir);
  })
}), {});

const Transition = ({ transition }) => {
  const { frame, dir } = transition;
  if (!frame) {
    return null;
  }

  return (
    <Group x={8} y={8} width={112} height={112}>
      {grids[dir][frame].map((row, y) => row.map((val, x) => (
        <Rect
          key={y * 8 + x}
          width={8} 
          height={8} 
          x={x * 8} 
          y={y * 8} 
          fill={val ? 'black' : null} 
        />
      )))}
    </Group>
  );
};

export default Transition;

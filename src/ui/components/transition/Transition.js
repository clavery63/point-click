import React from 'react';
import { Group, Rect } from 'react-konva';
import createGrid from './createGrid';

const Transition = ({ transition }) => {
  const { frame, dir } = transition;
  if (!frame) {
    return null;
  }

  /**
   * TODO: precalculate all of the grids instead of doing it each frame
   */
  const grid = createGrid(frame, dir);

  return (
    <Group x={8} y={8} width={112} height={112}>
      {grid.map((row, y) => row.map((val, x) => (
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

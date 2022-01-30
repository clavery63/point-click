import React from 'react';
import { Group, Rect } from 'react-konva';
import range from 'lodash/range';
import { useSelector } from 'shared/hooks';
import { DoorDir } from 'game/store/types';
import createGrid, { GRID_SIZE } from './createGrid';

const getGrids = (dir: DoorDir) => range(GRID_SIZE).map(createGrid(dir));
const grids = {
  RIGHT: getGrids('RIGHT'),
  LEFT: getGrids('LEFT'),
  UP: getGrids('UP'),
  DOWN: getGrids('DOWN'),
  FORWARD: getGrids('FORWARD'),
  BACK: getGrids('BACK'),
};

const Transition = () => {
  const transition = useSelector(state => state.transition);
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
          fill={val ? 'black' : undefined}
        />
      )))}
    </Group>
  );
};

export default Transition;

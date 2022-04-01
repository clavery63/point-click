import { setMenuButtonPosition } from 'admin/store/reducers/gameStateReducer/configReducer/positionsReducer';
import { useSelector, useDispatch } from 'admin/ui/hooks/redux';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import { Group, Image } from 'react-konva';
import { setCursorStyle } from 'shared/components/PreciseImage';

const dummyPositions = [
  { x: 0, y: 0 },
  { x: 32, y: 8 },
  { x: 16, y: 32 },
];

type Props = { top: number; left: number};
const MiniMapPositioned = ({ top, left }: Props) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gameState.images);

  return (
    <Group
      x={left + Math.random() / 1000}
      y={top + Math.random() / 1000}
      draggable
      onMouseEnter={setCursorStyle('pointer')}
      onMouseLeave={setCursorStyle('default')}
      onDragEnd={(e: KonvaEventObject<DragEvent>) => {
        dispatch(setMenuButtonPosition({
          top: Math.round(e.target.y()),
          left: Math.round(e.target.x()),
          name: 'miniMap',
        }));
      }}
    >
      {dummyPositions.map(({ x, y }) => (
        <Image
          key={`${x},${y}`}
          x={x}
          y={y}
          image={images['menu-button']}
        />
      ))}
    </Group>
  );
};

const MiniMapUI = () => {
  const { miniMap } = useSelector(state => state.gameState.config.positions);
  if (!miniMap) {
    // Hasn't loaded yet
    return null;
  }

  return <MiniMapPositioned top={miniMap.top} left={miniMap.left} />;
};

export default MiniMapUI;

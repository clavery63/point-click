import { Door } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';

type Props = {
  onClick: (id: number) => void;
  doors: Door[];
};
const MiniMap = ({ onClick, doors }: Props) => {
  const images = useSelector(state => state.images);
  const position = useSelector(state => state.config.positions.miniMap);
  return (
    <Group x={position.left} y={position.top}>
      {doors.map(door => (
        <Image
          key={door.id}
          x={door.mapPosition.x * 8}
          y={door.mapPosition.y * 8}
          onClick={() => onClick(door.id)}
          image={images.get('menu-button')}
        />
      ))}
    </Group>
  );
};

export default MiniMap;

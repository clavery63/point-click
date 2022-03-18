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
  return (
    <Group x={8} y={16}>
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

import { PageDir } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';

type Props = {
  onPageClick: (dir: PageDir) => void;
  onSaveClick: () => void;
};

const MenuRight = ({ onPageClick, onSaveClick }: Props) => {
  const images = useSelector(state => state.images);
  return (
    <Group x={170} y={5}>
      <Image
        key={1}
        x={5}
        y={10}
        onClick={() => onPageClick('UP')}
        image={images.get('menu-button')}
      />
      <Image
        key={2}
        x={5}
        y={26}
        onClick={() => onPageClick('DOWN')}
        image={images.get('menu-button')}
      />
      <Image
        key={3}
        x={5}
        y={58}
        onClick={onSaveClick}
        image={images.get('menu-button')}
      />
    </Group>
  );
};

export default MenuRight;

import { PageDir } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';

type Props = {
  onPageClick: (dir: PageDir) => void;
  onSaveClick: () => void;
};

const MenuRight = ({ onPageClick, onSaveClick }: Props) => {
  const images = useSelector(state => state.images);
  return (
    <>
      <Image
        key={1}
        x={175}
        y={15}
        onClick={() => onPageClick('UP')}
        image={images.get('menu-button')}
      />
      <Image
        key={2}
        x={175}
        y={31}
        onClick={() => onPageClick('DOWN')}
        image={images.get('menu-button')}
      />
      <Image
        key={3}
        x={175}
        y={63}
        onClick={onSaveClick}
        image={images.get('menu-button')}
      />
    </>
  );
};

export default MenuRight;

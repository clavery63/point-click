import { PageDir } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';

type Props = {
  onPageClick: (dir: PageDir) => void;
  onSaveClick: () => void;
};

const MenuRight = ({ onPageClick, onSaveClick }: Props) => {
  const { pageUp, pageDown, save } = useSelector(state => state.config.positions);
  const images = useSelector(state => state.images);
  return (
    <>
      <Image
        key={1}
        x={pageUp.left}
        y={pageUp.top}
        onClick={() => onPageClick('UP')}
        image={images.get('menu-button')}
      />
      <Image
        key={2}
        x={pageDown.left}
        y={pageDown.top}
        onClick={() => onPageClick('DOWN')}
        image={images.get('menu-button')}
      />
      <Image
        key={3}
        x={save.left}
        y={save.top}
        onClick={onSaveClick}
        image={images.get('menu-button')}
      />
    </>
  );
};

export default MenuRight;

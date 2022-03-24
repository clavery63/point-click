import { PageDir } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';
import MenuOption from './MenuOption';

type Props = {
  onPageClick: (dir: PageDir) => void;
  onSaveClick: () => void;
};

const MenuRight = ({ onPageClick, onSaveClick }: Props) => {
  const {
    pageUp, pageDown, save, self,
  } = useSelector(state => state.config.positions);
  const images = useSelector(state => state.images);
  return (
    <>
      <Image
        x={pageUp.left}
        y={pageUp.top}
        onClick={() => onPageClick('UP')}
        image={images.get('menu-button')}
      />
      <Image
        x={pageDown.left}
        y={pageDown.top}
        onClick={() => onPageClick('DOWN')}
        image={images.get('menu-button')}
      />
      <MenuOption
        left={self.left}
        top={self.top}
        onClick={() => {}}
        text="self"
      />
      <MenuOption
        left={save.left}
        top={save.top}
        onClick={onSaveClick}
        text="save"
      />
    </>
  );
};

export default MenuRight;

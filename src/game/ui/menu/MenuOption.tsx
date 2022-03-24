import { VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import { Rect, Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

type Props = {
  top: number;
  left: number;
  onClick: (verb: VerbIndex) => void;
  text: string;
  isActive?: boolean;
};

const MenuOption = (props: Props) => {
  const {
    top, left, onClick, text, isActive,
  } = props;
  const images = useSelector(state => state.images);

  return (
    <Group x={left} y={top}>
      {isActive && (
        <Rect
          fill="black"
          width={8}
          height={8}
        />
      )}
      {!isActive && (
        <Image
          onClick={onClick}
          image={images.get('menu-button')}
        />
      )}
      <Text text={text} left={9} top={1} />
    </Group>
  );
};

export default MenuOption;

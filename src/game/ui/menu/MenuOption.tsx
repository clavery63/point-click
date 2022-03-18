import { VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import { Rect, Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

type Props = {
  verbIndex: VerbIndex;
  top: number;
  left: number;
  onClick: (verb: VerbIndex) => void;
};

const MenuOption = (props: Props) => {
  const {
    verbIndex, top, left, onClick,
  } = props;
  const images = useSelector(state => state.images);
  const currentVerb = useSelector(state => state.playerState.verb);
  const verbNames = useSelector(state => state.verbNames);
  const isActive = verbIndex === currentVerb;

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
          onClick={() => onClick(verbIndex)}
          image={images.get('menu-button')}
        />
      )}
      <Text text={verbNames[verbIndex]} left={9} top={1} />
    </Group>
  );
};

export default MenuOption;

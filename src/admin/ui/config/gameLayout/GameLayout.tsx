import { useSelector } from 'admin/ui/hooks/redux';
import React from 'react';
import { Group, Image, Rect } from 'react-konva';
import MenuButtonsUI from './MenuButtonsUI';
import MiniMapUI from './MiniMapUI';
import StaticEntities from './StaticEntities';
import VerbsUI from './VerbsUI';

const GameLayout = () => {
  const images = useSelector(state => state.gameState.present.images);
  const { img, colors } = useSelector(state => state.gameState.present.config);
  const { cursor, menu, itemList } = img;
  return (
    <Group>
      <Rect width={256} height={240} fill="black" />
      <Group x={8} y={23}>
        <Rect width={128} height={128} fill={colors.background} />
        <Image
          image={images.border}
        />
      </Group>
      <Image
        x={50}
        y={50}
        image={images[cursor || 'cursor']}
      />
      <Image
        x={137}
        y={16}
        image={images[itemList || 'items']}
      />
      <Group x={17} y={152}>
        <Image image={images[menu || 'menu']} />
        <VerbsUI />
        <MenuButtonsUI />
        <MiniMapUI />
      </Group>
      <StaticEntities />
    </Group>
  );
};

export default GameLayout;

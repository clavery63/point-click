import { useSelector } from 'admin/ui/hooks/redux';
import React from 'react';
import { Group, Image, Rect } from 'react-konva';
import MenuButtonsUI from './MenuButtonsUI';
import MiniMapUI from './MiniMapUI';
import VerbsUI from './VerbsUI';

const GameLayout = () => {
  const images = useSelector(state => state.gameState.images);
  const { cursor, menu, itemList } = useSelector(state => state.gameState.config.img);
  return (
    <Group>
      <Rect width={256} height={240} fill="black" />
      <Image
        x={8}
        y={23}
        image={images.border}
      />
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
    </Group>
  );
};

export default GameLayout;

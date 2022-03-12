import React, { useCallback } from 'react';
import { Layer } from 'react-konva';
import Viewport from './ui/viewport/Viewport';
import Inventory from './ui/inventory/Inventory';
import MenuComponent from './ui/menu/Menu';
import TextOverlay from './ui/textOverlay/TextOverlay';
import Cursor, { StageData } from './ui/cursor/Cursor';
import OuterMenu from './ui/outerMenu/OuterMenu';
import ClickMask from './ui/clickMask/ClickMask';
import { Menu } from './store/types';
import StaticItems from './ui/staticItems/StaticItems';

type GameContentProps = {
  menu: Menu;
};
const GameContent = ({ menu }: GameContentProps) => {
  if (menu !== 'NONE') return null;
  return (
    <>
      <Viewport />
      <Inventory />
      <MenuComponent />
      <StaticItems />
      <TextOverlay />
      <ClickMask />
    </>
  );
};

type Props = {
  loading: boolean;
  menu: Menu;
  stageData: StageData;
};
const MainLayer = ({ loading, menu, stageData }: Props) => {
  const layerRef = useCallback(layer => {
    if (layer) {
      layer.imageSmoothingEnabled(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Layer ref={layerRef}>
      <GameContent menu={menu} />
      <OuterMenu />
      <Cursor stageData={stageData} />
    </Layer>
  );
};

export default MainLayer;

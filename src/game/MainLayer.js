import React, { useCallback } from 'react';
import { Layer } from 'react-konva';
import ViewportContainer from './ui/viewport/ViewportContainer';
import Inventory from './ui/inventory/Inventory';
import Menu from './ui/menu/Menu';
import TextOverlay from './ui/textOverlay/TextOverlay';
import Cursor from './ui/cursor/Cursor';
import OuterMenu from './ui/outerMenu/OuterMenu';
import ClickMask from './ui/clickMask/ClickMask';

const GameContent = ({ menu }) => {
  if (menu !== 'NONE') return null;
  return (
    <>
      <ViewportContainer />
      <Inventory />
      <Menu />
      <TextOverlay />
      <ClickMask />
    </>
  );
}

const MainLayer = ({ loading, menu, stageData }) => {
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

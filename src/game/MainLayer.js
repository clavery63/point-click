import React, { useCallback } from 'react';
import { Layer } from 'react-konva';
import ViewportContainer from './ui/viewport/ViewportContainer';
import InventoryContainer from './ui/inventory/InventoryContainer';
import MenuContainer from './ui/menu/MenuContainer';
import TextOverlayContainer from './ui/textOverlay/TextOverlayContainer';
import Cursor from './ui/cursor/Cursor';
import OuterMenuContainer from './ui/outerMenu/OuterMenuContainer';
import ClickMask from './ui/clickMask/ClickMask';

const GameContent = ({ menu }) => {
  if (menu !== 'NONE') return null;
  return (
    <>
      <ViewportContainer />
      <InventoryContainer />
      <MenuContainer />
      <TextOverlayContainer />
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
      <OuterMenuContainer />
      <Cursor stageData={stageData} />
    </Layer>
  );
};

export default MainLayer;

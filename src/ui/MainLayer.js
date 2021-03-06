import React, { useCallback } from 'react';
import { Layer } from 'react-konva';
import ViewportContainer from './components/viewport/ViewportContainer';
import InventoryContainer from './components/inventory/InventoryContainer';
import MenuContainer from './components/menu/MenuContainer';
import TextOverlayContainer from './components/textOverlay/TextOverlayContainer';
import CursorContainer from './components/cursor/CursorContainer';
import OuterMenuContainer from './components/outerMenu/OuterMenuContainer';

const GameContent = ({ menu }) => {
  if (menu !== 'NONE') return null;
  return (
    <>
      <ViewportContainer />
      <InventoryContainer />
      <MenuContainer />
      <TextOverlayContainer />
    </>
  );
}

const MainLayer = ({ loading, menu }) => {
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
      <CursorContainer />
    </Layer>
  );
};

export default MainLayer;

import React, { useCallback } from 'react';
import { Layer } from 'react-konva';
import ViewportContainer from './components/viewport/ViewportContainer';
import InventoryContainer from './components/inventory/InventoryContainer';
import MenuContainer from './components/menu/MenuContainer';
import TextOverlayContainer from './components/textOverlay/TextOverlayContainer';
import CursorContainer from './components/cursor/CursorContainer';

const MainLayer = ({ loading }) => {
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
      <ViewportContainer />
      <InventoryContainer />
      <MenuContainer />
      <TextOverlayContainer />
      <CursorContainer />
    </Layer>
  );
};

export default MainLayer;

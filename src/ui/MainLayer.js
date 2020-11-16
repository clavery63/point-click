import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Layer } from 'react-konva';
import ViewportContainer from './components/viewport/ViewportContainer';
import InventoryContainer from './components/inventory/InventoryContainer';
import MenuContainer from './components/menu/MenuContainer';
import TextOverlayContainer from './components/textOverlay/TextOverlayContainer';

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
    </Layer>
  );
};

export default connect(({ loading }) => ({ loading }))(MainLayer);

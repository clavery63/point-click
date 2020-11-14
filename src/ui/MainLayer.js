import React, { useEffect, useRef } from 'react';
import { Layer } from 'react-konva';
import ViewportContainer from './components/viewport/ViewportContainer';
import MenuContainer from './components/menu/MenuContainer';
import TextOverlayContainer from './components/textOverlay/TextOverlayContainer';

const MainLayer = () => {
  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current.imageSmoothingEnabled(false);
  }, [layerRef]);

  return (
    <Layer ref={layerRef}>
      <ViewportContainer />
      <MenuContainer />
      <TextOverlayContainer />
    </Layer>
  );
};

export default MainLayer;
import React, { useEffect, useRef } from 'react';
import { Layer } from 'react-konva';
import ViewportContainer from './components/viewport/ViewportContainer';

const MainLayer = () => {
  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current.imageSmoothingEnabled(false);
  }, [layerRef]);

  return (
    <Layer ref={layerRef}>
      <ViewportContainer />
    </Layer>
  );
};

export default MainLayer;

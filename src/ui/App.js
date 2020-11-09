import React, { useRef, useEffect, useState } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Stage, Layer, Text } from 'react-konva';
import ViewportContainer from './sections/viewport/ViewportContainer';

const numPixels = 240;

const calculateSize = stageRef => {
  const size = Math.min(window.innerHeight, window.innerWidth) * 0.9;
  const left = (window.innerWidth - size) / 2;
  const top = (window.innerHeight - size) / 2;
  stageRef.current.content.style.left = `${left}px`;
  stageRef.current.content.style.top = `${top}px`;

  return size;
};

const App = () => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [size, setSize] = useState(0);
  const scale = size / numPixels;

  useEffect(() => {
    stageRef.current.bufferCanvas.getContext('2d').imageSmoothingEnabled = false;
    setSize(calculateSize(stageRef));
    const resize = () => setSize(calculateSize(stageRef));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [stageRef]);

  useEffect(() => {
    layerRef.current.imageSmoothingEnabled(false);
  }, [layerRef]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          width={size}
          height={size}
          scale={{ x: scale, y: scale}}
          ref={stageRef}
        >
          <Provider store={store}>
            <Layer ref={layerRef}>
              <Text text='Hi' />
              <ViewportContainer />
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default App;

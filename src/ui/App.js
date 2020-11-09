import React, { useRef, useEffect, useState } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Stage, Layer, Text } from 'react-konva';
import './App.css';
import ViewportContainer from './sections/viewport/ViewportContainer';

const numPixels = 240;

const calculateSize = canvasRef => {
  const size = Math.min(window.innerHeight, window.innerWidth) * 0.9;
  const left = (window.innerWidth - size) / 2;
  const top = (window.innerHeight - size) / 2;
  canvasRef.current.content.style.left = `${left}px`;
  canvasRef.current.content.style.top = `${top}px`;

  return size;
};

const App = () => {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(0);
  const scale = size / numPixels;

  useEffect(() => {
    setSize(calculateSize(canvasRef));
    const resize = () => setSize(calculateSize(canvasRef));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          width={size}
          height={size}
          scale={{ x: scale, y: scale}}
          ref={canvasRef}
        >
          <Provider store={store}>
            <Layer>
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

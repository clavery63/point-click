import React, { useRef, useEffect, useState } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Stage } from 'react-konva';
import MainLayer from './MainLayer';

const pixelWidth = 256;
const pixelHeight = 240;
const horizStretch = 1.1;
const aspectRatio = (pixelHeight / (pixelWidth * horizStretch));
const paddingFactor = 1;

const calculateSize = stage => {
  const { innerHeight, innerWidth } = window;
  const fullWidth = Math.min(innerHeight / aspectRatio, innerWidth);
  const width = fullWidth * paddingFactor;
  const height = width * aspectRatio;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  stage.content.style.left = `${left}px`;
  stage.content.style.top = `${top}px`;

  return width;
};

const App = () => {
  const stageRef = useRef(null);
  const [width, setWidth] = useState(0);
  const scale = width / pixelWidth;

  useEffect(() => {
    setWidth(calculateSize(stageRef.current));
    const resize = () => setWidth(calculateSize(stageRef.current));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [stageRef]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          width={width}
          height={width * aspectRatio}
          scaleX={scale}
          scaleY={scale / horizStretch}
          ref={stageRef}
        >
          <Provider store={store}>
            <MainLayer />
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};


export default App;

import React, { useRef, useEffect, useState } from 'react';
import { ReactReduxContext, Provider, connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import ViewportContainer from './sections/viewport/ViewportContainer';

const pixelWidth = 256;
const pixelHeight = 240;
const horizStretch = 1.1;
const aspectRatio = (pixelHeight / (pixelWidth * horizStretch));
const paddingFactor = 0.9;

const calculateSize = stageRef => {
  const { innerHeight, innerWidth } = window;
  const fullWidth = Math.min(innerHeight / aspectRatio, innerWidth);
  const width = fullWidth * paddingFactor;
  const height = width * aspectRatio;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  stageRef.current.content.style.left = `${left}px`;
  stageRef.current.content.style.top = `${top}px`;

  return width;
};

const runText = (text) => {
  return {
    type: 'RUN_TEXT',
    payload: text
  }
}

const TextInput = connect(null, { runText })(({ runText }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <textarea onChange={e => setText(e.target.value)} value={text} />
      <button onClick={() => runText(text)}>RUN TEXT</button>
    </div>
  );
});

const App = () => {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const scale = width / pixelWidth;

  useEffect(() => {
    // stageRef.current.bufferCanvas.getContext('2d').imageSmoothingEnabled = false;
    setWidth(calculateSize(stageRef));
    const resize = () => setWidth(calculateSize(stageRef));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [stageRef]);

  useEffect(() => {
    layerRef.current.imageSmoothingEnabled(false);
  }, [layerRef]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <>
          <TextInput />
          <Stage
            width={width}
            height={width * aspectRatio}
            scaleX={scale * horizStretch}
            scaleY={scale}
            ref={stageRef}
          >
            <Provider store={store}>
              <Layer ref={layerRef}>
                <ViewportContainer />
              </Layer>
            </Provider>
          </Stage>
        </>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default App;

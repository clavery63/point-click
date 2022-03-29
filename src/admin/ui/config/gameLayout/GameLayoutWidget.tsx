import React, { useCallback } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Layer, Stage } from 'react-konva';
import GameLayout from './GameLayout';

const WIDTH = 256;
const HEIGHT = 240;
const SCALE = 3;

const GameLayoutWidget = () => {
  const layerRef = useCallback(layer => {
    if (layer) {
      layer.imageSmoothingEnabled(false);
    }
  }, []);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          width={WIDTH * SCALE}
          height={HEIGHT * SCALE}
          scaleX={SCALE}
          scaleY={SCALE}
        >
          <Provider store={store}>
            <Layer ref={layerRef}>
              <GameLayout />
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default GameLayoutWidget;

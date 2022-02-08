import React, { useCallback } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Layer, Stage } from 'react-konva';
import { Room } from 'game/store/types';
import Viewport from './Viewport';

const VIEWPORT_SIZE = 112;
const SCALE = 5;

type Props = {
  room: Room;
};
const PreviewWidget = ({ room }: Props) => {
  const layerRef = useCallback(layer => {
    if (layer) {
      layer.imageSmoothingEnabled(false);
    }
  }, []);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          width={VIEWPORT_SIZE * SCALE}
          height={VIEWPORT_SIZE * SCALE}
          scaleX={SCALE}
          scaleY={SCALE}
        >
          <Provider store={store}>
            <Layer ref={layerRef}>
              <Viewport room={room} />
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default PreviewWidget;

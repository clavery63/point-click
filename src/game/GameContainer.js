import React, { useRef, useEffect, useState, useMemo } from 'react';
import { connect, ReactReduxContext, Provider } from 'react-redux';
import { Stage } from 'react-konva';
import MainLayer from './MainLayer';

const pixelWidth = 256;
const pixelHeight = 240;
const horizStretch = 1.13;
const aspectRatio = (pixelHeight / (pixelWidth * horizStretch));

const calculateSize = (parentRef) => {
  const { width, height } = parentRef.getBoundingClientRect();
  return Math.min(height / aspectRatio, width);
};

const GameContainer = ({ loading, menu, parentRef }) => {
  const stageRef = useRef(null);
  const [width, setWidth] = useState(0);
  const scaleX = width / pixelWidth;
  const scaleY = scaleX / horizStretch;

  useEffect(() => {
    setWidth(calculateSize(parentRef.current));
    const resize = () => setWidth(calculateSize(parentRef.current));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [stageRef]);

  const stageData = useMemo(() => {
    return { 
      stage: stageRef.current, 
      scaleX, 
      scaleY
    }
  }, [stageRef, scaleX, scaleY]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage
          width={width}
          height={width * aspectRatio}
          scaleX={scaleX}
          scaleY={scaleY}
          ref={stageRef}
        >
          <Provider store={store}>
            <MainLayer loading={loading} menu={menu} stageData={stageData} />
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

const mapStateToProps = ({ loading, menu }) => ({ loading, menu });

export default connect(mapStateToProps)(GameContainer);

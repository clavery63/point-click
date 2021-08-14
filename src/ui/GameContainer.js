import React, { useRef, useEffect, useState, useMemo } from 'react';
import { connect, ReactReduxContext, Provider } from 'react-redux';
import { Stage } from 'react-konva';
import MainLayer from './MainLayer';

const pixelWidth = 256;
const pixelHeight = 240;
const horizStretch = 1.13;
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

const GameContainer = ({ loading, menu }) => {
  const stageRef = useRef(null);
  const [width, setWidth] = useState(0);
  const scaleX = width / pixelWidth;
  const scaleY = scaleX / horizStretch;

  useEffect(() => {
    setWidth(calculateSize(stageRef.current));
    const resize = () => setWidth(calculateSize(stageRef.current));
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

import React, {
  useEffect, useState, useMemo,
} from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Stage } from 'react-konva';
import { useSelector } from 'shared/hooks/redux';
import MainLayer from './MainLayer';
import { Nullable } from './store/types';

const pixelWidth = 256;
const pixelHeight = 240;
const horizStretch = 1.13;
const aspectRatio = (pixelHeight / (pixelWidth * horizStretch));

const calculateSize = (parentEl: Nullable<HTMLDivElement>) => {
  if (!parentEl) {
    return 0;
  }
  const { width, height } = parentEl.getBoundingClientRect();
  return Math.min(height / aspectRatio, width);
};

type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
};
const GameContainer = ({ parentRef }: Props) => {
  const loading = useSelector(state => state.loading);
  const menu = useSelector(state => state.menu);
  const stageRef = React.useRef<any>(null); // Sorry.
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
      scaleY,
    };
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

export default GameContainer;

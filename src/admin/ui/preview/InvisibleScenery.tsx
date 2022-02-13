import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Rect, Transformer } from 'react-konva';
import { setScenerySize } from 'admin/store/reducers/gameStateReducer/worldStateReducer/sceneryReducer';
import { Position, Scenery } from 'game/store/types';
import { KonvaEventObject } from 'konva/types/Node';
import useCachebuster from '../hooks/useCachebuster';

type Props = {
  id: number;
  position: Position;
  scenery: Scenery;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onClick: () => void;
  opacity: number;
};
const InisibleScenery = ({
  id, position, scenery, onDragEnd, onClick, opacity,
}: Props) => {
  const dispatch = useDispatch();
  const cachebuster = useCachebuster(position);
  const rectRef = useRef<any>(null); // Sorry.
  const trRef = useRef<any>(null); // Sorry.
  const width = scenery.size?.width || 0;
  const height = scenery.size?.height || 0;

  useEffect(() => {
    if (rectRef.current && trRef.current) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [rectRef, trRef]);

  return (
    <>
      <Rect
        ref={rectRef}
        x={position.left + cachebuster}
        y={position.top + cachebuster}
        width={width}
        height={height}
        scaleX={1}
        scaleY={1}
        fill="red"
        opacity={0.7 * opacity}
        draggable
        onDragEnd={onDragEnd}
        onTransformEnd={() => {
          const { x, y } = rectRef.current.scale();
          rectRef.current.setScale(({ x: 1, y: 1 }));
          dispatch(setScenerySize({
            id,
            width: Math.round(width * x),
            height: Math.round(height * y),
          }));
        }}
        onClick={onClick}
      />
      <Transformer
        ref={trRef}
        rotateEnabled={false}
        anchorSize={7}
        keepRatio={false}
        enabledAnchors={['bottom-right']}
      />
    </>
  );
};

export default InisibleScenery;

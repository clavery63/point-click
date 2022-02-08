import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Rect, Transformer } from 'react-konva';
import { setScenerySize } from 'admin/store/reducers/gameStateReducer/worldStateReducer/sceneryReducer';
import { PositionAndSize } from 'game/store/types';
import { KonvaEventObject } from 'konva/types/Node';
import useCachebuster from '../hooks/useCachebuster';

type Props = {
  id: number;
  position: PositionAndSize;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onClick: () => void;
};
const InisibleScenery = ({
  id, position, onDragEnd, onClick,
}: Props) => {
  const dispatch = useDispatch();
  const cachebuster = useCachebuster(position);
  const rectRef = useRef<any>(null); // Sorry.
  const trRef = useRef<any>(null); // Sorry.

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
        width={position.width}
        height={position.height}
        scaleX={1}
        scaleY={1}
        fill="red"
        opacity={0.7}
        draggable
        onDragEnd={onDragEnd}
        onTransformEnd={() => {
          const { x, y } = rectRef.current.scale();
          rectRef.current.setScale(({ x: 1, y: 1 }));
          dispatch(setScenerySize({
            id,
            width: Math.round(position.width * x),
            height: Math.round(position.height * y),
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

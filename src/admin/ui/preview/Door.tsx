import React from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { KonvaEventObject } from 'konva/types/Node';
import PreciseImage from 'shared/components/PreciseImage';
import { Door } from 'game/store/types';
import { setDoorPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { useSelector, useDispatch } from '../hooks/redux';
import useCachebuster from '../hooks/useCachebuster';
import { isUnselected } from '../utils/isSelected';
import useReordering from '../hooks/useReordering';

type Props = {
  door: Door;
  roomId: number;
};
const DoorComponent = ({ door, roomId }: Props) => {
  const dispatch = useDispatch();
  const imgName = door.openImg || door.closedImg || '';
  const image = useSelector(state => state.gameState.images[imgName]);
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);
  const cachebuster = useCachebuster(door.position);
  useReordering(door, roomId, 'doors');

  if (!door.position || !image) {
    return null;
  }

  return (
    <PreciseImage
      x={door.position.left + cachebuster}
      y={door.position.top + cachebuster}
      width={image.width}
      height={image.height}
      image={image}
      opacity={isUnselected(door, selectedEnt) ? 0.5 : 1}
      draggable
      onDragEnd={(e: KonvaEventObject<DragEvent>) => {
        dispatch(setDoorPosition({
          id: door.id,
          x: Math.round(e.target.x()),
          y: Math.round(e.target.y()),
        }));
      }}
      onClick={() => {
        dispatch(setSelected({
          id: door.id,
          type: 'doors',
        }));
      }}
    />
  );
};

export default DoorComponent;

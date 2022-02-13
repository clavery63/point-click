import React from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setSceneryPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/sceneryReducer';
import { KonvaEventObject } from 'konva/types/Node';
import { useSelector, useDispatch } from '../hooks/redux';
import VisibleScenery from './VisibleScenery';
import InvisibleScenery from './InvisibleScenery';
import { isUnselected } from '../utils/isSelected';
import useReordering from '../hooks/useReordering';

type Props = {
  id: number;
  roomId: number;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Scenery = ({ id, roomId }: Props) => {
  const dispatch = useDispatch();
  const scenery = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);

  useReordering(scenery, roomId, 'scenery');

  const editing = 'startPosition';

  const position = scenery[editing];

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    dispatch(setSceneryPosition({
      id,
      field: editing,
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y()),
    }));
  };

  const SceneryComponent = scenery.img ? VisibleScenery : InvisibleScenery;

  return (
    <SceneryComponent
      id={id}
      scenery={scenery}
      position={position}
      opacity={isUnselected(scenery, selectedEnt) ? 0.5 : 1}
      onDragEnd={onDragEnd}
      onClick={() => {
        dispatch(setSelected({
          id,
          type: 'scenery',
        }));
      }}
    />
  );
};

export default Scenery;

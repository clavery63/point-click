import React from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setEntityPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { KonvaEventObject } from 'konva/types/Node';
import { Scenery } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import VisibleScenery from './VisibleScenery';
import InvisibleScenery from './InvisibleScenery';
import { isUnselected } from '../utils/isSelected';
import useReordering from '../hooks/useReordering';

type Props = {
  roomId?: number;
  scenery: Scenery;
};
const SceneryComponent = ({ roomId, scenery }: Props) => {
  const dispatch = useDispatch();
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);
  const sceneriesEditing = useSelector(state => state.editorState.sceneryEditing);

  useReordering(scenery, roomId);

  const editing = sceneriesEditing[scenery.id] || 'startPosition';
  const position = scenery[editing] || scenery.startPosition;

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    dispatch(setEntityPosition({
      id: scenery.id,
      field: editing,
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y()),
    }));
  };

  const Component = scenery.img ? VisibleScenery : InvisibleScenery;

  return (
    <Component
      id={scenery.id}
      scenery={scenery}
      position={position}
      opacity={isUnselected(scenery, selectedEnt) ? 0.5 : 1}
      onDragEnd={onDragEnd}
      onClick={() => {
        dispatch(setSelected({
          id: scenery.id,
          type: 'entity',
        }));
      }}
    />
  );
};

export default SceneryComponent;

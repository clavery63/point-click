import React, { useEffect } from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setSceneryPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/sceneryReducer';
import { KonvaEventObject } from 'konva/types/Node';
import { reorderScenery } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { useSelector, useDispatch } from '../hooks/redux';
import VisibleScenery from './VisibleScenery';
import InvisibleScenery from './InvisibleScenery';
import { isSelected, isUnselected } from '../utils/isSelected';

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

  useEffect(() => {
    const keyup = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (!isSelected(scenery, selectedEnt)) {
        return;
      }

      if (e.key === 'ArrowUp') {
        dispatch(reorderScenery({ roomId, entityId: id, direction: 'UP' }));
      }

      if (e.key === 'ArrowDown') {
        dispatch(reorderScenery({ roomId, entityId: id, direction: 'DOWN' }));
      }
    };
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keyup', keyup);
    };
  }, [selectedEnt]);

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

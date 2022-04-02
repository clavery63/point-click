import { reorderEntity, ReorderType } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Entity } from 'game/store/types';
import { useEffect } from 'react';
import { isSelected } from '../utils/isSelected';
import { useDispatch, useSelector } from './redux';

const useReordering = (entity: Entity, roomId?: number, type: ReorderType = 'entities') => {
  const dispatch = useDispatch();
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (!roomId || !isSelected(entity, selectedEnt)) {
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch(reorderEntity({
          roomId, entityId: entity.id, type, direction: 'UP',
        }));
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch(reorderEntity({
          roomId, entityId: entity.id, type, direction: 'DOWN',
        }));
      }
    };
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [selectedEnt]);
};

export default useReordering;

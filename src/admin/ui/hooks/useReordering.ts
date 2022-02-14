import { reorderEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Entity } from 'game/store/types';
import { useEffect } from 'react';
import { isSelected } from '../utils/isSelected';
import { useDispatch, useSelector } from './redux';

const useReordering = (entity: Entity, roomId: number, type: 'scenery' | 'items') => {
  const dispatch = useDispatch();
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);

  useEffect(() => {
    const keyup = (e: KeyboardEvent) => {
      // TODO: This isn't working. We want to avoid scrolling here.
      e.preventDefault();
      if (!isSelected(entity, selectedEnt)) {
        return;
      }

      if (e.key === 'ArrowUp') {
        dispatch(reorderEntity({
          roomId, entityId: entity.id, type, direction: 'UP',
        }));
      }

      if (e.key === 'ArrowDown') {
        dispatch(reorderEntity({
          roomId, entityId: entity.id, type, direction: 'DOWN',
        }));
      }
    };
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keyup', keyup);
    };
  }, [selectedEnt]);
};

export default useReordering;
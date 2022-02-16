import { reorderEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Entity } from 'game/store/types';
import { useEffect } from 'react';
import { isSelected } from '../utils/isSelected';
import { useDispatch, useSelector } from './redux';

const useReordering = (entity: Entity, roomId: number) => {
  const dispatch = useDispatch();
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (!isSelected(entity, selectedEnt)) {
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch(reorderEntity({
          roomId, entityId: entity.id, type: entity.type, direction: 'UP',
        }));
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch(reorderEntity({
          roomId, entityId: entity.id, type: entity.type, direction: 'DOWN',
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

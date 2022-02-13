import { reorderScenery } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Entity } from 'game/store/types';
import { useEffect } from 'react';
import { isSelected } from '../utils/isSelected';
import { useDispatch, useSelector } from './redux';

const useReordering = (entity: Entity, roomId: number) => {
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
        dispatch(reorderScenery({ roomId, entityId: entity.id, direction: 'UP' }));
      }

      if (e.key === 'ArrowDown') {
        dispatch(reorderScenery({ roomId, entityId: entity.id, direction: 'DOWN' }));
      }
    };
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keyup', keyup);
    };
  }, [selectedEnt]);
};

export default useReordering;

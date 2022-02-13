import { SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Entity, Nullable } from 'game/store/types';

export const isSelected = (entity: Entity, selectedEntity: Nullable<SelectedEntity>) => {
  if (!selectedEntity) {
    return false;
  }
  return entity.id === selectedEntity.id && entity.type === selectedEntity.type;
};

export const isUnselected = (entity: Entity, selectedEntity: Nullable<SelectedEntity>) => {
  if (!selectedEntity) {
    return false;
  }
  return !isSelected(entity, selectedEntity);
};

import { SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Entity, Nullable } from 'game/store/types';

export const isSelected = (entity: Entity, selectedEntity: Nullable<SelectedEntity>) => {
  if (!selectedEntity) {
    return false;
  }

  if (entity.type === 'doors' && selectedEntity.type !== 'doors') {
    // TODO: this is a hack and also cuases a bug in the viewport
    // when a door and entity share an id
    return false;
  }

  return entity.id === selectedEntity.id;
};

export const isUnselected = (entity: Entity, selectedEntity: Nullable<SelectedEntity>) => {
  if (!selectedEntity) {
    return false;
  }
  return !isSelected(entity, selectedEntity);
};

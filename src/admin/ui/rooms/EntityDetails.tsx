import React from 'react';
import { useSelector } from '../hooks/redux';
import ItemDetails from './ItemDetails';

const EntityDetails = () => {
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);

  if (!selectedEntity) {
    return null;
  }

  const entity = useSelector(state => {
    return state.gameState.worldState.entities[selectedEntity.id];
  });

  if (entity.type === 'items') {
    <ItemDetails item={entity} />;
  }

  // TODO: add scenery and doors
  return null;
};

export default EntityDetails;

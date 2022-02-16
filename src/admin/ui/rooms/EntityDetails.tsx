import React from 'react';
import { useSelector } from '../hooks/redux';
import ItemDetails from './ItemDetails';

const EntityDetails = () => {
  const entity = useSelector(state => {
    const { selectedEntity } = state.editorState;
    if (!selectedEntity) {
      return null;
    }
    return state.gameState.worldState.entities[selectedEntity.id];
  });

  if (entity?.type === 'items') {
    return <ItemDetails item={entity} />;
  }

  // TODO: add scenery and doors
  return null;
};

export default EntityDetails;

import React from 'react';
import { useSelector } from '../hooks/redux';
import ItemDetails from './ItemDetails';

const EntityDetails = () => {
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);
  // TODO: combine these so we don't have to do the weird '-1' hack below
  const entity = useSelector(state => {
    return state.gameState.worldState.entities[selectedEntity?.id || -1];
  });

  if (!entity) {
    return null;
  }

  if (entity.type === 'items') {
    return <ItemDetails item={entity} />;
  }

  // TODO: add scenery and doors
  return null;
};

export default EntityDetails;

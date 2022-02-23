import React from 'react';
import { useSelector } from '../hooks/redux';
import ItemDetails from './ItemDetails';
import SceneryDetails from './SceneryDetails';

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

  if (entity?.type === 'scenery') {
    return <SceneryDetails scenery={entity} />;
  }

  // TODO: add doors
  return null;
};

export default EntityDetails;

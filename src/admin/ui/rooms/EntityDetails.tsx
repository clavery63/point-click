import React from 'react';
import { useSelector } from '../hooks/redux';
import DoorDetails from './DoorDetails';
import ItemDetails from './ItemDetails';
import SceneryDetails from './SceneryDetails';

const EntityDetails = () => {
  const entity = useSelector(state => {
    const { selectedEntity } = state.editorState;
    if (!selectedEntity) {
      return null;
    }
    if (selectedEntity.type === 'doors') {
      return state.gameState.worldState.doors[selectedEntity.id];
    }
    if (selectedEntity.type === 'entity') {
      return state.gameState.worldState.entities[selectedEntity.id];
    }
    return null;
  });

  if (entity?.type === 'items') {
    return <ItemDetails item={entity} />;
  }

  if (entity?.type === 'scenery') {
    return <SceneryDetails scenery={entity} />;
  }

  if (entity?.type === 'doors') {
    return <DoorDetails door={entity} />;
  }

  return null;
};

export default EntityDetails;

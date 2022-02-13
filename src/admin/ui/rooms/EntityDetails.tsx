import React from 'react';
import { useSelector } from '../hooks/redux';
import ItemDetails from './ItemDetails';

const components = {
  items: ItemDetails,
  scenery: null,
  doors: null,
};

const EntityDetails = () => {
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);

  if (!selectedEntity) {
    return null;
  }

  const Component = components[selectedEntity.type];

  if (!Component) {
    return null;
  }

  return (
    <Component entity={selectedEntity} />
  );
};

export default EntityDetails;

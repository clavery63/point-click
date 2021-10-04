import React from 'react';
import { useSelector } from 'react-redux';
import ItemDetails from './ItemDetails';

const components = {
    item: ItemDetails
};

const EntityDetails = () => {
  const selectedEntity = useSelector(state => state.selectedEntity);

  if (!selectedEntity) {
      return null;
  }

  console.log('selectedEntity:', selectedEntity)

  const Component = components[selectedEntity.type];

  if (!Component) {
      return null;
  }

  return (
    <Component entity={selectedEntity} />
  );
};

export default EntityDetails;

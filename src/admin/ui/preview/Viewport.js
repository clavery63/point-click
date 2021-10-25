import React, { useEffect } from 'react';
import { Image, Group } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import Scenery from './Scenery';

const shouldDisplay = (id, type, selectedEntity) => {
  if (!selectedEntity) {
    return true;
  }
  return id === selectedEntity.id && type === selectedEntity.type;
};

const ObjectGroup = ({ Component, ids, type, selectedEntity }) => (
  <Group>
    {ids.map(id => {
      return shouldDisplay(id, type, selectedEntity) && (
        <Component
          key={id}
          id={id}
        />
      )}
    )}
  </Group>
);

const Background = ({ image, selectedEntity }) => {
  const dispatch = useDispatch();
  const clearSelected = () => dispatch({ type: 'CLEAR_SELECTED'});
  
  useEffect(() => clearSelected, []);

  return (
    <Image 
      width={112} 
      height={112} 
      image={image}
      opacity={selectedEntity ? 0.5 : 1}
      onClick={clearSelected}
    />
  );
};

const Viewport = props => {
  const { doors, items, scenery, img } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img]);
  const selectedEntity = useSelector(state => state.selectedEntity);

  return (
    <Group>
      <Background image={roomImg} selectedEntity={selectedEntity} />
      {/* <ObjectGroup ids={doors} collection={'doors'} /> */}
      <ObjectGroup ids={items} Component={Item} type='item' selectedEntity={selectedEntity} />
      <ObjectGroup ids={scenery} Component={Scenery} type='scenery' selectedEntity={selectedEntity} />
    </Group>
  );
};

export default Viewport;

import React from 'react';
import { Image, Group } from 'react-konva';
import { useSelector } from 'react-redux';
import Item from './Item';
import Scenery from './Scenery';

const ObjectGroup = ({ Component, ids, type }) => (
  <Group>
    {ids.map(id => (
      <Component
        key={id}
        id={id}
      />
    ))}
  </Group>
);

const Background = ({ image }) => {
  // TODO: set opactity to 0.5 when editing a single object
  return <Image width={112} height={112} image={image} />
};

const Viewport = props => {
  const { doors, items, scenery, img } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img]);

  return (
    <Group>
      <Background image={roomImg} />
      {/* <ObjectGroup ids={doors} collection={'doors'} /> */}
      <ObjectGroup ids={items} Component={Item} type='item' />
      <ObjectGroup ids={scenery} Component={Scenery} type='scenery' />
    </Group>
  );
};

export default Viewport;

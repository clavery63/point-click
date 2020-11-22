import React from 'react';
import { Image, Group } from 'react-konva';
import TransitionContainer from '../transition/TransitionContainer';
import Door from './Door';
import Item from './Item';
import Scenery from './Scenery';

const ObjectGroup = ({ Component, objects, onClick }) => (
  <Group>
    {objects.map(object => (
      <Component
        key={object.id}
        object={object}
        onClick={onClick}
      />
    ))}
  </Group>
);

const Viewport = props => {
  const { 
    onClick, 
    borderImg, 
    roomImg, 
    doors, 
    items, 
    scenery 
  } = props

  return (
    <Group x={8} y={23}>
      <Image width={128} height={128} image={borderImg} />
      <Group x={8} y={8}>
        <Image width={112} height={112} image={roomImg} />
        <ObjectGroup objects={doors} onClick={onClick} Component={Door} />
        <ObjectGroup objects={items} onClick={onClick} Component={Item} />
        <ObjectGroup objects={scenery} onClick={onClick} Component={Scenery} />
      </Group>
      <TransitionContainer />
    </Group>
  );
};

export default Viewport;

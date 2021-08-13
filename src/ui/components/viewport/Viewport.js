import React from 'react';
import { Image, Group } from 'react-konva';
import TransitionContainer from '../transition/TransitionContainer';
import Door from './Door';
import Item from './Item';
import Scenery from './Scenery';
import Video from '../shared/Video';

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

const Background = ({ image, video }) => {
  if (video) {
    // TODO: whoa, is this rendering on every cursor and text update? This should get
    // its own connected component, but also lets get those out of redux
    return <Video src={`https://doublehamburger.com/${video}`} />
  }

  return <Image width={112} height={112} image={image} />
};

const Viewport = props => {
  const { 
    onClick, 
    borderImg, 
    roomImg, 
    doors, 
    items, 
    scenery,
    video
  } = props

  return (
    <Group x={8} y={23}>
      <Image width={128} height={128} image={borderImg} />
      <Group x={8} y={8}>
        <Background image={roomImg} video={video} />
        <ObjectGroup objects={doors} onClick={onClick} Component={Door} />
        <ObjectGroup objects={items} onClick={onClick} Component={Item} />
        <ObjectGroup objects={scenery} onClick={onClick} Component={Scenery} />
      </Group>
      <TransitionContainer />
    </Group>
  );
};

export default Viewport;

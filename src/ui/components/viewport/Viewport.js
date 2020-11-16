import React from 'react';
import { Image, Group } from 'react-konva';

const ObjectGroup = ({ objects, onClick }) => (
  <Group>
    {objects.map(({ id, position, type, img }) => (
      <Image
        key={id}
        x={position.left}
        y={position.top}
        image={img}
        onClick={() => onClick(id, type)}
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
      <Image
        width={128}
        height={128}
        image={borderImg}
      />
      <Group x={8} y={8}>
        <Image
          width={112}
          height={112}
          image={roomImg}
        />
        <ObjectGroup objects={doors} onClick={onClick} />
        <ObjectGroup objects={items} onClick={onClick} />
        <ObjectGroup objects={scenery} onClick={onClick} />
      </Group>
    </Group>
  );
};

export default Viewport;

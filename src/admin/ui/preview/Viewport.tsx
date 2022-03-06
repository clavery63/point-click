import React from 'react';
import { Group } from 'react-konva';
import { Room } from 'game/store/types';
import { useSelector } from '../hooks/redux';
import Item from './Item';
import Scenery from './Scenery';
import Door from './Door';
import Background from './Background';

type EntityType = {
  id: number;
  roomId: number;
};
const Entity = ({ id, roomId }: EntityType) => {
  const entity = useSelector(state => {
    return state.gameState.worldState.entities[id];
  });

  if (entity?.type === 'items') {
    return <Item item={entity} roomId={roomId} />;
  }

  if (entity?.type === 'scenery') {
    return <Scenery scenery={entity} roomId={roomId} />;
  }

  return null;
};

const DoorWrapper = ({ id, roomId }: EntityType) => {
  const door = useSelector(state => {
    return state.gameState.worldState.doors[id];
  });

  if (!door) {
    return null;
  }

  return <Door door={door} roomId={roomId} />;
};

type EntitiesType = {
  ids: number[];
  roomId: number;
};
const Entities = ({ ids, roomId }: EntitiesType) => (
  <Group>
    {ids.map(id => {
      return (
        <Entity
          key={id}
          id={id}
          roomId={roomId}
        />
      );
    })}
  </Group>
);

const Doors = ({ ids, roomId }: EntitiesType) => (
  <Group>
    {ids.map(id => {
      return (
        <DoorWrapper
          key={id}
          id={id}
          roomId={roomId}
        />
      );
    })}
  </Group>
);

type Props = {
  room: Room;
  roomId: number;
};
const Viewport = (props: Props) => {
  const { doors, entities } = props.room;
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);

  return (
    <Group>
      <Background room={props.room} selectedEntity={selectedEntity} />
      <Doors ids={doors} roomId={props.roomId} />
      <Entities ids={entities} roomId={props.roomId} />
    </Group>
  );
};

export default Viewport;

import React, { useEffect } from 'react';
import { Group } from 'react-konva';
import { Image } from 'shared/components/tappables';
import { clearSelected, SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Nullable, Room } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import Item from './Item';
import Scenery from './Scenery';
import Door from './Door';

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

type BackgroundProps = {
  image?: HTMLImageElement;
  selectedEntity: Nullable<SelectedEntity>;
};
const Background = ({ image, selectedEntity }: BackgroundProps) => {
  const dispatch = useDispatch();
  const clear = () => {
    dispatch(clearSelected());
  };

  useEffect(() => clear, []);

  return (
    <Image
      width={112}
      height={112}
      image={image}
      opacity={selectedEntity ? 0.5 : 1}
      onClick={clear}
    />
  );
};

type Props = {
  room: Room;
  roomId: number;
};
const Viewport = (props: Props) => {
  const {
    doors, entities, img,
  } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img || '']);
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);

  return (
    <Group>
      <Background image={roomImg} selectedEntity={selectedEntity} />
      <Doors ids={doors} roomId={props.roomId} />
      <Entities ids={entities} roomId={props.roomId} />
    </Group>
  );
};

export default Viewport;

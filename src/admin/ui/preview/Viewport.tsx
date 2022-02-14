import React, { useEffect } from 'react';
import { Group } from 'react-konva';
import { Image } from 'shared/components/tappables';
import { clearSelected, SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Nullable, Room } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import Item from './Item';
import Scenery from './Scenery';

type EntityType = {
  id: number;
  roomId: number;
};
const Entity = ({ id, roomId }: EntityType) => {
  const entity = useSelector(state => {
    return state.gameState.worldState.entities[id];
  });

  if (entity.type === 'items') {
    return <Item item={entity} roomId={roomId} />;
  }

  return <Scenery scenery={entity} roomId={roomId} />;
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
    entities, img,
  } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img || '']);
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);

  return (
    <Group>
      <Background image={roomImg} selectedEntity={selectedEntity} />
      {/* <ObjectGroup ids={doors} collection={'doors'} /> */}
      <Entities ids={entities} roomId={props.roomId} />
    </Group>
  );
};

export default Viewport;

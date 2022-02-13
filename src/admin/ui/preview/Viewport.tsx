import React, { useEffect } from 'react';
import { Group } from 'react-konva';
import { Image } from 'shared/components/tappables';
import { clearSelected, SelectedEntity } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Nullable, Room } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import Item from './Item';
import Scenery from './Scenery';

type ObjectGroupType<T> = {
  Component: T;
  ids: number[];
  roomId: number;
};
const ObjectGroup = ({
  Component, ids, roomId,
}: ObjectGroupType<React.FC<{ id: number; roomId: number }>>) => (
  <Group>
    {ids.map(id => {
      return (
        <Component
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
    items, scenery, img,
  } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img || '']);
  const selectedEntity = useSelector(state => state.editorState.selectedEntity);

  return (
    <Group>
      <Background image={roomImg} selectedEntity={selectedEntity} />
      {/* <ObjectGroup ids={doors} collection={'doors'} /> */}
      <ObjectGroup
        ids={items}
        roomId={props.roomId}
        Component={Item}
      />
      <ObjectGroup
        ids={scenery}
        roomId={props.roomId}
        Component={Scenery}
      />
    </Group>
  );
};

export default Viewport;

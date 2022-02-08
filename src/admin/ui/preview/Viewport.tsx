import React, { useEffect } from 'react';
import { Image, Group } from 'react-konva';
import { clearSelected, SelectedEntity } from 'admin/store/reducers/selectedEntityReducer';
import { Nullable, Room } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import Item from './Item';
import Scenery from './Scenery';

const shouldDisplay = (id: number, type: string, selectedEntity: Nullable<SelectedEntity>) => {
  if (!selectedEntity) {
    return true;
  }
  return id === selectedEntity.id && type === selectedEntity.type;
};

type ObjectGroupType<T> = {
  Component: T;
  ids: number[];
  type: string;
  selectedEntity: Nullable<SelectedEntity>;
};
const ObjectGroup = ({
  Component, ids, type, selectedEntity,
}: ObjectGroupType<React.FC<{ id: number }>>) => (
  <Group>
    {ids.map(id => {
      return shouldDisplay(id, type, selectedEntity) && (
        <Component
          key={id}
          id={id}
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
};
const Viewport = (props: Props) => {
  const {
    items, scenery, img,
  } = props.room;
  const roomImg = useSelector(state => state.gameState.images[img || '']);
  const selectedEntity = useSelector(state => state.selectedEntity);

  return (
    <Group>
      <Background image={roomImg} selectedEntity={selectedEntity} />
      {/* <ObjectGroup ids={doors} collection={'doors'} /> */}
      <ObjectGroup ids={items} Component={Item} type="item" selectedEntity={selectedEntity} />
      <ObjectGroup ids={scenery} Component={Scenery} type="scenery" selectedEntity={selectedEntity} />
    </Group>
  );
};

export default Viewport;

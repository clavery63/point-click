import React from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setEntityPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { KonvaEventObject } from 'konva/types/Node';
import PreciseImage from 'shared/components/PreciseImage';
import { Item } from 'game/store/types';
import { useSelector, useDispatch } from '../hooks/redux';
import useCachebuster from '../hooks/useCachebuster';
import { isUnselected } from '../utils/isSelected';
import useReordering from '../hooks/useReordering';

type Props = {
  item: Item;
  roomId?: number;
};
const ItemComponent = ({ item, roomId }: Props) => {
  const dispatch = useDispatch();
  const imgKey = item.imgSet?.img || item.img || '';
  const image = useSelector(state => state.gameState.present.images[imgKey]);
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);
  const cachebuster = useCachebuster(item.position);
  useReordering(item, roomId);

  if (!item.position || !image) {
    return null;
  }

  return (
    <PreciseImage
      x={item.position.left + cachebuster}
      y={item.position.top + cachebuster}
      width={item.imgSet?.width || image.width}
      height={image.height}
      image={image}
      opacity={isUnselected(item, selectedEnt) ? 0.5 : 1}
      draggable
      crop={item.imgSet !== undefined && {
        width: item.imgSet?.width,
        height: image.height,
      }}
      onDragEnd={(e: KonvaEventObject<DragEvent>) => {
        dispatch(setEntityPosition({
          id: item.id,
          x: Math.round(e.target.x()),
          y: Math.round(e.target.y()),
        }));
      }}
      onClick={() => {
        dispatch(setSelected({
          id: item.id,
          type: 'entity',
        }));
      }}
    />
  );
};

export default ItemComponent;

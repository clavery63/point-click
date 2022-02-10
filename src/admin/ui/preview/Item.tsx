import React from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setItemPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/itemsReducer';
import { KonvaEventObject } from 'konva/types/Node';
import PreciseImage from 'shared/components/PreciseImage';
import { useSelector, useDispatch } from '../hooks/redux';
import useCachebuster from '../hooks/useCachebuster';

type Props = {
  id: number;
};
const Item = ({ id }: Props) => {
  const dispatch = useDispatch();
  const { img, position } = useSelector(state => {
    return state.gameState.worldState.items[id];
  });
  const image = useSelector(state => state.gameState.images[img || '']);
  const cachebuster = useCachebuster(position);

  if (!position) {
    return null;
  }

  return (
    <PreciseImage
      x={position.left + cachebuster}
      y={position.top + cachebuster}
      width={position.width}
      height={position.height}
      image={image}
      draggable
      onDragEnd={(e: KonvaEventObject<DragEvent>) => {
        dispatch(setItemPosition({
          id,
          x: Math.round(e.target.x()),
          y: Math.round(e.target.y()),
        }));
      }}
      onClick={() => {
        dispatch(setSelected({
          id,
          type: 'item',
        }));
      }}
    />
  );
};

export default Item;

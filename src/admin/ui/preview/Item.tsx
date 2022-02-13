import React from 'react';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { setItemPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/itemsReducer';
import { KonvaEventObject } from 'konva/types/Node';
import PreciseImage from 'shared/components/PreciseImage';
import { useSelector, useDispatch } from '../hooks/redux';
import useCachebuster from '../hooks/useCachebuster';
import { isUnselected } from '../utils/isSelected';

type Props = {
  id: number;
};
const Item = ({ id }: Props) => {
  const dispatch = useDispatch();
  const item = useSelector(state => {
    return state.gameState.worldState.items[id];
  });
  const image = useSelector(state => state.gameState.images[item.img || '']);
  const selectedEnt = useSelector(state => state.editorState.selectedEntity);
  const cachebuster = useCachebuster(item.position);

  if (!item.position) {
    return null;
  }

  return (
    <PreciseImage
      x={item.position.left + cachebuster}
      y={item.position.top + cachebuster}
      width={image.width}
      height={image.height}
      image={image}
      opacity={isUnselected(item, selectedEnt) ? 0.5 : 1}
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

import React from 'react';
import { setSelected } from 'admin/store/reducers/selectedEntityReducer';
import { setSceneryPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/sceneryReducer';
import { KonvaEventObject } from 'konva/types/Node';
import { useSelector, useDispatch } from '../hooks/redux';
import VisibleScenery from './VisibleScenery';
import InvisibleScenery from './InvisibleScenery';

type Props = {
  id: number;
};
const Scenery = ({ id }: Props) => {
  const dispatch = useDispatch();
  const scenery = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });

  const editing = 'startPosition';

  const position = scenery[editing];

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    dispatch(setSceneryPosition({
      id,
      field: editing,
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y()),
    }));
  };

  const SceneryComponent = scenery.img ? VisibleScenery : InvisibleScenery;

  return (
    <SceneryComponent
      id={id}
      scenery={scenery}
      position={position}
      onDragEnd={onDragEnd}
      onClick={() => {
        dispatch(setSelected({
          id,
          type: 'scenery',
        }));
      }}
    />
  );
};

export default Scenery;

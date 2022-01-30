import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VisibleScenery from './VisibleScenery';
import InvisibleScenery from './InvisibleScenery';
import { setSelected } from 'admin/store/reducers/selectedEntityReducer';
import { setSceneryPosition } from 'admin/store/reducers/gameStateReducer/worldStateReducer/sceneryReducer';

const Scenery = ({ id, editing = 'startPosition' }) => {
  const dispatch = useDispatch();
  const scenery = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });

  const position = scenery[editing];

  const onDragEnd = (e) => {
    dispatch(setSceneryPosition({
      id,
      field: editing,
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y())
    }));
  };

  const SceneryComponent = scenery.img ? VisibleScenery : InvisibleScenery;

  return (
    <SceneryComponent
      id={id}
      scenery={scenery}
      position={position}
      onDragEnd={onDragEnd}
      onClick={(e) => {
        dispatch(setSelected({
          id,
          type: 'scenery'
        }))
      }}
    />
  );
};

export default Scenery;

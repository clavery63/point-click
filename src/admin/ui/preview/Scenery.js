import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VisibleScenery from './VisibleScenery';
import InvisibleScenery from './InvisibleScenery';

const Scenery = ({ id, editing = 'startPosition' }) => {
  const dispatch = useDispatch();
  const scenery = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });

  const position = scenery[editing];

  const onDragEnd = (e) => {
    dispatch({
      type: 'SET_SCENERY_POSITION',
      payload: {
        id,
        field: editing,
        x: Math.round(e.target.x()),
        y: Math.round(e.target.y())
      }
    });
  };

  const SceneryComponent = scenery.img ? VisibleScenery : InvisibleScenery;

  return (
    <SceneryComponent
      id={id}
      scenery={scenery}
      position={position}
      onDragEnd={onDragEnd}
      onClick={(e) => {
        dispatch({
          type: 'SET_SELECTED',
          payload: {
            id,
            type: 'scenery'
          }
        })
      }}
    />
  );
};

export default Scenery;

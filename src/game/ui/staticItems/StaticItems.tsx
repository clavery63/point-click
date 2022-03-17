import React from 'react';
import { useDispatch, useSelector } from 'shared/hooks';
import Item from '../viewport/Item';
import Torch from './Torch';

const StaticItems = () => {
  const dispatch = useDispatch();
  const entities = useSelector(state => state.worldState.entities);
  const staticEnts = Object.values(entities).filter(({ isStatic }) => !!isStatic);

  return (
    <>
      <Torch />
      {staticEnts.map(entity => {
        if (entity.type !== 'items') {
          return null;
        }

        return (
          <Item
            key={entity.id}
            item={entity}
            onClick={(id: number) => dispatch({
              type: 'SELECT_OBJECT',
              payload: id,
            })}
          />
        );
      })}
    </>
  );
};

export default StaticItems;

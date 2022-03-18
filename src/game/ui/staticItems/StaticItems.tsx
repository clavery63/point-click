import React from 'react';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import Item from '../viewport/Item';

const StaticItems = () => {
  const dispatch = useDispatch();
  const entities = useSelector(state => state.worldState.entities);
  const staticEnts = Object.values(entities).filter(({ isStatic }) => !!isStatic);

  return (
    <>
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

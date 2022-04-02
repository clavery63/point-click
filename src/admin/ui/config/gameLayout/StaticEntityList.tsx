import { createItem } from 'admin/store/epics/createObject';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { deleteEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { useDispatch, useSelector } from 'admin/ui/hooks/redux';
import ObjectsList from 'admin/ui/rooms/ObjectsList';
import React from 'react';

const StaticEntityList = () => {
  const dispatch = useDispatch();
  const entityInfos = useSelector(state => {
    return Object.values(state.gameState.worldState.entities)
      .filter(ent => !!ent.isStatic)
      .map(ent => ({ id: ent.id, name: ent.name || ent.id.toString() }));
  });

  return (
    <ObjectsList
      objectInfos={entityInfos}
      label="Items:"
      onSelect={(id: number) => {
        dispatch(setSelected({
          id,
          type: 'entity',
        }));
      }}
      onDelete={(id: number) => {
        dispatch(deleteEntity({ id }));
      }}
      onAdd={() => dispatch(createItem())}
    />
  );
};

export default StaticEntityList;

import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import React from 'react';
import { createContainedItem } from 'admin/store/epics/createObject';
import { deleteEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { Item, Scenery } from 'game/store/types';
import { useDispatch, useSelector } from '../hooks/redux';
import ObjectsList from './ObjectsList';

type Props = { container: Item | Scenery };
const Contains = ({ container }: Props) => {
  const dispatch = useDispatch();
  const contains = container.contains || [];

  const entityInfos = useSelector(state => contains.map(id => {
    const ent = state.gameState.present.worldState.entities[id];
    return { id, type: ent.type, name: ent.name || ent.id.toString() };
  }));

  return (
    <ObjectsList
      objectInfos={entityInfos.filter(ent => ent.type === 'items')}
      label="Contains:"
      onSelect={(id: number) => {
        dispatch(setSelected({
          id,
          type: 'entity',
        }));
      }}
      onDelete={(id: number) => {
        dispatch(deleteEntity({ id, containerId: container.id }));
      }}
      onAdd={() => dispatch(createContainedItem(container.id))}
    />
  );
};

export default Contains;

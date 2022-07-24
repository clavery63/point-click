import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import React from 'react';
import { createDoor, createItem, createScenery } from 'admin/store/epics/createObject';
import { useParams } from 'react-router-dom';
import { deleteEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { deleteDoor } from 'admin/store/reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { Room } from 'game/store/types';
import { useDispatch, useSelector } from '../hooks/redux';
import ObjectsList from './ObjectsList';

type Props = { room: Room };
const ObjectsSummary = ({ room }: Props) => {
  const dispatch = useDispatch();
  const { roomId: roomIdString } = useParams<{ roomId: string }>();
  const roomId = parseInt(roomIdString, 10);
  const { entities, doors } = room;

  const entityInfos = useSelector(state => entities.map(id => {
    const ent = state.gameState.present.worldState.entities[id];
    return { id, type: ent.type, name: ent.name || ent.id.toString() };
  }));

  const doorInfos = useSelector(state => doors.map(id => {
    const ent = state.gameState.present.worldState.doors[id];
    return {
      id,
      name: ent.name || ent.closedImg || ent.openImg || ent.id.toString(),
    };
  }));

  return (
    <div>
      <ObjectsList
        objectInfos={entityInfos.filter(ent => ent.type === 'items')}
        label="Items:"
        onSelect={(id: number) => {
          dispatch(setSelected({
            id,
            type: 'entity',
          }));
        }}
        onDelete={(id: number) => {
          dispatch(deleteEntity({ id, roomId }));
        }}
        onAdd={() => dispatch(createItem(roomId))}
      />
      <ObjectsList
        objectInfos={entityInfos.filter(ent => ent.type === 'scenery')}
        label="Scenery:"
        onSelect={(id: number) => {
          dispatch(setSelected({
            id,
            type: 'entity',
          }));
        }}
        onDelete={(id: number) => {
          dispatch(deleteEntity({ id, roomId }));
        }}
        onAdd={() => dispatch(createScenery(roomId))}
      />
      <ObjectsList
        objectInfos={doorInfos}
        label="Doors:"
        onSelect={(id: number) => {
          dispatch(setSelected({
            id,
            type: 'doors',
          }));
        }}
        onDelete={(id: number) => {
          dispatch(deleteDoor({ id, roomId }));
        }}
        onAdd={() => dispatch(createDoor(roomId))}
      />
    </div>
  );
};

export default ObjectsSummary;

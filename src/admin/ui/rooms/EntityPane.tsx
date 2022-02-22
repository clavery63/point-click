import { Room } from 'game/store/types';
import React from 'react';
import { useSelector } from '../hooks/redux';
import EntityDetails from './EntityDetails';

type Props = { room: Room };
type Ids = { ids: number[] };

const RoomEntities = ({ ids }: Ids) => {
  const entities = useSelector(state => ids.map(id => {
    return state.gameState.worldState.entities[id];
  }));

  return (
    <div>
      {entities.map(entity => (
        <div key={entity.id}>
          {entity.name}
        </div>
      ))}
    </div>
  );
};

const EntitySummary = ({ room }: Props) => {
  // TODO: add doors
  const { entities } = room;

  return (
    <div>
      <RoomEntities ids={entities} />
    </div>
  );
};

const EntityPane = ({ room }: Props) => {
  return (
    <div>
      <EntitySummary room={room} />
      <EntityDetails />
    </div>
  );
};

export default EntityPane;

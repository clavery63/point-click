import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Room } from 'game/store/types';
import React from 'react';
import { createItem } from 'admin/store/epics/createItem';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from '../hooks/redux';
import EntityDetails from './EntityDetails';
import DispatchButton from '../shared/DispachButton';

type Props = { room: Room };
type Ids = { ids: number[] };

type ButtonProps = { roomId: number };
const CreateItemButton = ({ roomId }: ButtonProps) => (
  <DispatchButton
    action={createItem(roomId)}
    callToAction="create item"
    color="primary"
  />
);

const RoomEntities = ({ ids }: Ids) => {
  const dispatch = useDispatch();
  const entities = useSelector(state => ids.map(id => {
    return state.gameState.worldState.entities[id];
  }));
  const { roomId: roomIdString } = useParams<{ roomId: string }>();
  const roomId = parseInt(roomIdString, 10);

  return (
    <div>
      {entities.map(entity => (
        <div>
          <div
            onClick={() => {
              dispatch(setSelected({
                id: entity.id,
                type: 'items',
              }));
            }}
            key={entity.id}
          >
            {entity.name}
          </div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(setSelected({
                id: entity.id,
                type: 'scenery',
              }));
            }}
            key={entity.id}
            size="small"
          >
            delete
          </Button>
        </div>
      ))}
      <CreateItemButton roomId={roomId} />
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
    <div style={{ float: 'left' }}>
      <EntitySummary room={room} />
      <EntityDetails />
    </div>
  );
};

export default EntityPane;

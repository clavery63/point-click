import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { Room } from 'game/store/types';
import React from 'react';
import { createDoor, createItem } from 'admin/store/epics/createItem';
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { deleteEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { deleteDoor } from 'admin/store/reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import EntityDetails from './EntityDetails';
import useStyles from '../shared/useStyles';

type Props = { room: Room };

type ButtonProps = { onAdd: () => void };
const CreateObjectButton = ({ onAdd }: ButtonProps) => {
  return (
    <IconButton
      onClick={onAdd}
      color="primary"
    >
      <AddIcon />
    </IconButton>
  );
};

type ObjectsListProps = {
  objectInfos: { id: number; name: string}[];
  label: string;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
};
const ObjectsList = ({
  objectInfos, label, onSelect, onDelete, onAdd,
}: ObjectsListProps) => {
  return (
    <Stack direction="row" spacing={1} style={{ alignItems: 'center' }}>
      <Typography>{label}</Typography>
      {objectInfos.map(entity => (
        <Chip
          key={entity.id}
          label={entity.name}
          onClick={() => onSelect(entity.id)}
          onDelete={() => onDelete(entity.id)}
          deleteIcon={<DeleteIcon />}
          variant="outlined"
        />
      ))}
      <CreateObjectButton onAdd={onAdd} />
    </Stack>
  );
};

const EntitySummary = ({ room }: Props) => {
  const dispatch = useDispatch();
  const { roomId: roomIdString } = useParams<{ roomId: string }>();
  const roomId = parseInt(roomIdString, 10);
  const { entities, doors } = room;

  const entityInfos = useSelector(state => entities.map(id => {
    const ent = state.gameState.worldState.entities[id];
    return { id, name: ent.name || '' };
  }));

  const doorInfos = useSelector(state => doors.map(id => {
    const ent = state.gameState.worldState.doors[id];
    // TODO: let's force doors to have a name :)
    return { id, name: ent.closedImg || ent.openImg || ent.id.toString() };
  }));

  return (
    <div>
      <ObjectsList
        objectInfos={entityInfos}
        label="Entities:"
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

const EntityPane = ({ room }: Props) => {
  const styles = useStyles();
  return (
    <Box className={styles.rightColumn}>
      <EntitySummary room={room} />
      <EntityDetails />
    </Box>
  );
};

export default EntityPane;

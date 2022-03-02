import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type ButtonProps = { onAdd: () => void };
export const CreateObjectButton = ({ onAdd }: ButtonProps) => {
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

export default ObjectsList;

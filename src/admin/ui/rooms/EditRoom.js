import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import PreviewButton from '../shared/PreviewButton';
import UploadButton from '../shared/UploadButton';

const EditRoom = () => {
  const { roomId } = useParams();
  const styles = useStyles();
  const dispatch = useDispatch();
  const room = useSelector(state => {
    return state.gameState.worldState.rooms[roomId];
  });
  
  const handleChange = fieldName => event => {
    dispatch({
      type: 'SET_ROOM',
      payload: {
        id: roomId,
        room: {
          ...room,
          [fieldName]: event.target.value
        }
      }
    });
  };

  if (!room) {
    return null;
  }

  return (
    <Grid container className={styles.container}>
      <Typography variant="h4">Edit Room: {roomId}</Typography>
      <Grid item xs={12}>
        <LongTextField
          label="initial description"
          value={room.initialDescription}
          onChange={handleChange('initialDescription')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={room.description}
          onChange={handleChange('description')}
        />
      </Grid>
      <PreviewButton roomId={roomId} />
      <UploadButton />
    </Grid>
  );
};

export default EditRoom;

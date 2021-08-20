import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import TestGameButton from '../shared/TestGameButton';
import UploadButton from '../shared/UploadButton';
import PreviewWidget from '../preview/PreviewWidget';
import { ArrowBack } from '@material-ui/icons';

const EditRoom = () => {
  const { roomId, gameName } = useParams();
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
      <Grid item xs={12}>
        <Link to={`/admin/${gameName}/rooms`}>
          <Button
            startIcon={<ArrowBack>back</ArrowBack>}
          >
            To Rooms List
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Edit Room: {roomId}</Typography>
      </Grid>
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
      <Grid item xs={12}>
        <PreviewWidget room={room} gameName={gameName} />
      </Grid>
      <TestGameButton roomId={roomId} />
      <UploadButton />
    </Grid>
  );
};

export default EditRoom;
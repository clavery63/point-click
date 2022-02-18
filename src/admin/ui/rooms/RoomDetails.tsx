import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useParams, Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { setRoom } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { useSelector, useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import TestGameButton from '../shared/TestGameButton';
import UploadButton from '../shared/UploadButton';
import PreviewWidget from '../preview/PreviewWidget';
import ImgSelector from '../shared/assets/ImgSelector';
import ImageUploader from '../shared/assets/ImageUploader';

const RoomDetails = () => {
  const {
    roomId: roomIdString,
    gameName,
  } = useParams<{ roomId: string; gameName: string }>();
  const roomId = parseInt(roomIdString, 10);
  const styles = useStyles();
  const dispatch = useDispatch();
  const room = useSelector(state => {
    return state.gameState.worldState.rooms[roomId];
  });

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >) => {
    dispatch(setRoom({
      id: roomId,
      room: {
        ...room,
        [fieldName]: event.target.value,
      },
    }));
  };

  if (!room) {
    return null;
  }

  return (
    <Grid container className={styles.leftColumn}>
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
        <Typography variant="h4">
          Edit Room:
          {' '}
          {roomId}
        </Typography>
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
        <ImgSelector
          label="background image"
          value={room.img}
          onChange={handleChange('img')}
        />
        <ImageUploader />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Click an object to select and edit.
          Press ↑ or ↓ to reorder selected object.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PreviewWidget room={room} roomId={roomId} />
      </Grid>
      <TestGameButton roomId={roomId} />
      <UploadButton />
    </Grid>
  );
};

export default RoomDetails;

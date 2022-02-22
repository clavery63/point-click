import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams, Link } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { setRoom } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Room } from 'game/store/types';
import { useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import TestGameButton from '../shared/TestGameButton';
import UploadButton from '../shared/UploadButton';
import PreviewWidget from '../preview/PreviewWidget';
import ImgSelector from '../shared/assets/ImgSelector';
import AudioSelector from '../shared/assets/AudioSelector';

type Props = { room: Room; roomId: number };
const RoomDetails = ({ room, roomId }: Props) => {
  const { gameName } = useParams<{ gameName: string }>();
  const dispatch = useDispatch();
  const styles = useStyles();

  const handleChange = (fieldName: string) => (value: string) => {
    dispatch(setRoom({
      id: roomId,
      room: {
        ...room,
        [fieldName]: value,
      },
    }));
  };

  if (!room) {
    return null;
  }

  return (
    <Box className={styles.leftColumn}>
      <Grid container>
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
            label="bg img"
            value={room.img}
            onChange={handleChange('img')}
          />
        </Grid>
        <Grid item xs={12}>
          <AudioSelector
            label="music"
            value={room.music}
            onChange={handleChange('music')}
          />
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
        <Stack direction="row" spacing={2}>
          <TestGameButton roomId={roomId} />
          <UploadButton />
        </Stack>
      </Grid>
    </Box>
  );
};

export default RoomDetails;

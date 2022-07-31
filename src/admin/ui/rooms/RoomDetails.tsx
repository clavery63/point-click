import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { setRoom } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Room } from 'game/store/types';
import { useDispatch } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import TestGameButton from '../shared/TestGameButton';
import PreviewWidget from '../preview/PreviewWidget';
import ImgSelector from '../shared/assets/ImgSelector';
import AudioSelector from '../shared/assets/AudioSelector';
import VideoSelector from '../shared/assets/VideoSelector';
import Toggle from '../shared/Toggle';

type Props = { room: Room; roomId: number };
const RoomDetails = ({ room, roomId }: Props) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const handleChange = (fieldName: keyof Room) => (value: any) => {
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
          <PreviewWidget room={room} roomId={roomId} />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Click an object to select and edit.
            Press ↑ or ↓ to reorder selected object.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LongTextField
            label="room name"
            value={room.name}
            onChange={handleChange('name')}
            tooltip="Friendly name for this room. Does not serve any purpose in game."
          />
        </Grid>
        <Grid item xs={12}>
          <LongTextField
            label="room description"
            value={room.description}
            onChange={handleChange('description')}
            tooltip="Default text that displays upon entering this room"
          />
        </Grid>
        <Grid item xs={12}>
          <LongTextField
            label="initial description"
            value={room.initialDescription}
            onChange={handleChange('initialDescription')}
            tooltip="Text to display just the first time the player enters this room"
          />
        </Grid>
        <Grid item xs={12}>
          <ImgSelector
            label="bg img"
            value={room.img}
            onChange={handleChange('img')}
            tooltip="Background image for this room"
          />
        </Grid>
        <Grid item xs={12}>
          <VideoSelector
            label="bg video"
            value={room.video}
            onChange={handleChange('video')}
            tooltip="Background video for this room. Takes precedence over bg img"
          />
        </Grid>
        <Grid item xs={12}>
          <AudioSelector
            label="music"
            value={room.music}
            onChange={handleChange('music')}
            tooltip="Background music to play upon entering the room"
          />
        </Grid>
        <Grid item xs={12}>
          <Toggle
            value={!!room.gameOver}
            onChange={handleChange('gameOver')}
            label="game over screen?"
            tooltip="If true, this room triggers the game over menu"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomDetails;

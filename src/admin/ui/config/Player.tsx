import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PlayerState } from 'game/store/types';
import { setPlayer } from 'admin/store/reducers/gameStateReducer/playerStateReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import Selector from '../shared/Selector';

// TODO: this will become less goofy once these are configurable (will be indexes instead)
const verbOptions = ['MOVE', 'LOOK', 'OPEN', 'USE', 'SMOKE', 'TAKE', 'EAT', 'HIT', 'SPEAK'];

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.gameState.playerState);
  const allRoomIds = useSelector(state => Object.keys(state.gameState.worldState.rooms));
  // const allItems = useSelector(state => {
  //   return state.gameState.worldState.entities;
  // });

  const handleChange = (fieldName: keyof PlayerState) => (value: any) => {
    dispatch(setPlayer({
      player: {
        ...player,
        [fieldName]: value,
      },
    }));
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Player State:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Selector
          required
          label="initial verb"
          value={player.verb}
          onChange={handleChange('verb')}
          options={verbOptions}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          required
          label="initial room"
          value={player.room}
          onChange={val => handleChange('room')(parseInt(val, 10))}
          options={allRoomIds}
        />
      </Grid>
    </>
  );
};

export default Player;

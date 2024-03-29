import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PlayerState } from 'game/store/types';
import { setPlayer } from 'admin/store/reducers/gameStateReducer/playerStateReducer';
import { deleteEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { setSelected } from 'admin/store/reducers/editorStateReducer/selectedEntityReducer';
import { createPlayerItem } from 'admin/store/epics/createObject';
import { useDispatch, useSelector } from '../hooks/redux';
import Selector, { makeOptions } from '../shared/Selector';
import ObjectsList from '../rooms/ObjectsList';

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.gameState.present.playerState);
  const allRoomIds = useSelector(state => Object.keys(state.gameState.present.worldState.rooms));
  const currentInventory = useSelector(state => player.items.map(id => {
    const ent = state.gameState.present.worldState.entities[id];
    return { id, type: ent.type, name: ent.name || ent.id.toString() };
  }));
  const verbs = useSelector(state => state.gameState.present.config.verbs);

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
          options={verbs.map((verb: any, index) => ({ value: index, label: verb.name }))}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          required
          label="initial room"
          value={player.room}
          onChange={val => handleChange('room')(parseInt(val, 10))}
          options={makeOptions(allRoomIds)}
        />
      </Grid>
      <ObjectsList
        objectInfos={currentInventory}
        label="Inventory:"
        onSelect={(id: number) => {
          dispatch(setSelected({
            id,
            type: 'entity',
          }));
        }}
        onDelete={(id: number) => {
          dispatch(deleteEntity({ id }));
        }}
        onAdd={() => dispatch(createPlayerItem())}
      />
    </>
  );
};

export default Player;

import React, { useCallback, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Door, DoorDir, DoorState } from 'game/store/types';
import { setDoor } from 'admin/store/reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { createSelector } from 'reselect';
import { RootState, useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';
import Selector, { makeOptions } from '../shared/Selector';
import MapPositioner from './MapPositioner';
import Toggle from '../shared/Toggle';
import FlagsInput from '../shared/FlagsInput';

const selectRooms = (state: RootState) => state.gameState.present.worldState.rooms;
const selectEntities = (state: RootState) => state.gameState.present.worldState.entities;
const roomIdsSelector = createSelector(selectRooms, rooms => {
  return Object.keys(rooms).map(id => parseInt(id, 10));
});
const keyIdsSelector = createSelector(selectEntities, ents => {
  return Object.keys(ents).map(id => parseInt(id, 10));
});

type Props = {
  door: Door;
};
const DoorDetails = ({ door }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const allRoomIds = useSelector(roomIdsSelector);
  const allKeyIds = useSelector(keyIdsSelector);

  const handleChange = useCallback((fieldName: keyof Door) => useCallback((value: any) => {
    dispatch(setDoor({
      id: door.id,
      door: {
        ...door,
        [fieldName]: value,
      },
    }));
  }, [fieldName, door]), [door]);

  const destOptions = useMemo(() => makeOptions(allRoomIds), [allRoomIds]);
  const keyIdOptions = useMemo(() => makeOptions(allKeyIds), [allKeyIds]);
  const stateOptions = useMemo(() => makeOptions(Object.keys(DoorState)), []);
  const dirOptions = useMemo(() => makeOptions(Object.keys(DoorDir)), []);

  return (
    <Grid container className={styles.rightColumn}>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Door:
          {' '}
          {door.id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="closedText"
          value={door.closedText}
          onChange={handleChange('closedText')}
          tooltip="Custom text to display when the player examines the doors and it is in a CLOSED state"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="openText"
          value={door.openText}
          onChange={handleChange('openText')}
          tooltip="Custom text to display when the player opens the door"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="lockedText"
          value={door.lockedText}
          onChange={handleChange('lockedText')}
          tooltip="Custom text to display when the player examines the doors and it is in a LOCKED state"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="unlockText"
          value={door.unlockText}
          onChange={handleChange('unlockText')}
          tooltip="Custom text to display when the player unlocks the door"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={door.description}
          onChange={handleChange('description')}
          tooltip="Default text to display when examining the door in any state"
        />
      </Grid>
      <Grid item xs={12}>
        <Toggle
          value={!!door.hidden}
          onChange={handleChange('hidden')}
          label="hidden?"
          tooltip="If true, the door is hidden from the minimap until the player opens it via the viewport"
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="destination"
          value={door.dest}
          onChange={handleChange('dest')}
          options={destOptions}
          tooltip="The ID of the room this door leads to"
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="key id"
          value={door.keyId}
          onChange={handleChange('keyId')}
          options={keyIdOptions}
          tooltip="The ID of the item the player must be USING to unlock the door"
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="state"
          value={door.state}
          onChange={handleChange('state')}
          options={stateOptions}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="transition"
          value={door.dir}
          onChange={handleChange('dir')}
          options={dirOptions}
          tooltip="The predefined animation that runs when transition to the next room through this door"
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="closedImg"
          value={door.closedImg}
          onChange={handleChange('closedImg')}
          tooltip="Image to display when the door is in a CLOSED state. If non specified, display whatever is in the background"
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="openImg"
          value={door.openImg}
          onChange={handleChange('openImg')}
          tooltip="Image to display when the door is in an OPEN state. If non specified, display whatever is in the background"
        />
      </Grid>
      <Grid item xs={12}>
        <FlagsInput
          label="open condition"
          value={door.openCondition}
          onChange={handleChange('openCondition')}
          // eslint-disable-next-line max-len
          // tooltip="Custom flag to determine if player can open this door (even if the door is in an OPEN state)"
        />
      </Grid>
      <Grid item xs={12}>
        <MapPositioner
          label="Select Minimap Position"
          value={door.mapPosition}
          onChange={handleChange('mapPosition')}
        />
      </Grid>
    </Grid>
  );
};

export default DoorDetails;

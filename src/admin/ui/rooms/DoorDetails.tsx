import React from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Door, DoorDir, DoorState } from 'game/store/types';
import { setDoor } from 'admin/store/reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';
import Selector, { makeOptions } from '../shared/Selector';
import MapPositioner from './MapPositioner';

type Props = {
  door: Door;
};
const DoorDetails = ({ door }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const allRoomIds = useSelector(state => Object.keys(state.gameState.worldState.rooms));
  const allKeyIds = useSelector(state => Object.keys(state.gameState.worldState.entities));

  const handleChange = (fieldName: keyof Door) => (value: any) => {
    dispatch(setDoor({
      id: door.id,
      door: {
        ...door,
        [fieldName]: value,
      },
    }));
  };

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
          value={door.closedText || ''}
          onChange={handleChange('closedText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="openText"
          value={door.openText || ''}
          onChange={handleChange('openText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="lockedText"
          value={door.lockedText || ''}
          onChange={handleChange('lockedText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="unlockText"
          value={door.unlockText || ''}
          onChange={handleChange('unlockText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={door.description || ''}
          onChange={handleChange('description')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={(
            <Switch
              checked={!!door.hidden}
              onChange={e => handleChange('hidden')(e.currentTarget.checked)}
            />
          )}
          label="hidden?"
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="destination"
          value={door.dest}
          onChange={val => handleChange('dest')(parseInt(val, 10))}
          options={makeOptions(allRoomIds)}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="key id"
          value={door.keyId || ''}
          onChange={id => handleChange('keyId')(parseInt(id, 10))}
          options={makeOptions(allKeyIds)}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="state"
          value={door.state}
          onChange={handleChange('state')}
          options={makeOptions(Object.keys(DoorState))}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="animation direction"
          value={door.dir}
          onChange={handleChange('dir')}
          options={makeOptions(Object.keys(DoorDir))}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="closedImg"
          value={door.closedImg || ''}
          onChange={handleChange('closedImg')}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="openImg"
          value={door.openImg || ''}
          onChange={handleChange('openImg')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="open condition"
          value={door.openCondition || ''}
          onChange={handleChange('openCondition')}
        />
      </Grid>
      <Grid item xs={12}>
        <MapPositioner
          label="Select Map Position"
          value={door.mapPosition}
          onChange={handleChange('mapPosition')}
        />
      </Grid>
    </Grid>
  );
};

export default DoorDetails;

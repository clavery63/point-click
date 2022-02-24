import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Door } from 'game/store/types';
import { setDoor } from 'admin/store/reducers/gameStateReducer/worldStateReducer/doorsReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';
import Selector from '../shared/Selector';

type Props = {
  door: Door;
};
const DoorDetails = ({ door }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const allRoomIds = useSelector(state => Object.keys(state.gameState.worldState.rooms));

  const handleChange = (fieldName: keyof Door) => (value: string) => {
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
          value={door.closedText}
          onChange={handleChange('closedText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="openText"
          value={door.openText}
          onChange={handleChange('openText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="lockedText"
          value={door.lockedText}
          onChange={handleChange('lockedText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="unlockText"
          value={door.unlockText}
          onChange={handleChange('unlockText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={door.description}
          onChange={handleChange('description')}
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="destination"
          value={door.dest}
          onChange={handleChange('dest')}
          options={allRoomIds}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="closedImg"
          value={door.closedImg}
          onChange={handleChange('closedImg')}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="openImg"
          value={door.openImg}
          onChange={handleChange('openImg')}
        />
      </Grid>
    </Grid>
  );
};

export default DoorDetails;

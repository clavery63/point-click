import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { setEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { Scenery } from 'game/store/types';
import { setSceneryEditing } from 'admin/store/reducers/editorStateReducer/sceneryEditingReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';

type Props = {
  scenery: Scenery;
};
const SceneryDetails = ({ scenery }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const sceneriesEditing = useSelector(state => state.editorState.sceneryEditing);
  const positionEditing = sceneriesEditing[scenery.id] || 'startPosition';

  const handleChange = (fieldName: keyof Scenery) => (value: string) => {
    dispatch(setEntity({
      id: scenery.id,
      entity: {
        ...scenery,
        [fieldName]: value,
      },
    }));
  };

  return (
    <Grid container className={styles.rightColumn}>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Scenery:
          {' '}
          {scenery.id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="name"
          value={scenery.name}
          onChange={handleChange('name')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={scenery.description}
          onChange={handleChange('description')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={(
            <Switch
              checked={positionEditing === 'endPosition'}
              onChange={e => {
                const position = e.currentTarget.checked ? 'endPosition' : 'startPosition';
                dispatch(setSceneryEditing({
                  position,
                  id: scenery.id,
                }));
              }}
            />
          )}
          label={`Editing: ${positionEditing}`}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="img"
          value={scenery.img || ''}
          onChange={handleChange('img')}
        />
      </Grid>
    </Grid>
  );
};

export default SceneryDetails;

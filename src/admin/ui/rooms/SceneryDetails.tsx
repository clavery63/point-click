import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setEntity } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { Nullable, Scenery } from 'game/store/types';
import { setSceneryEditing } from 'admin/store/reducers/editorStateReducer/sceneryEditingReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import useStyles from '../shared/useStyles';
import ImgSelector from '../shared/assets/ImgSelector';
import Selector from '../shared/Selector';
import Verbs from '../verbs';
import Contains from './Contains';
import Toggle from '../shared/Toggle';

type Props = {
  scenery: Scenery;
};
const SceneryDetails = ({ scenery }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const verbNames = useSelector(state => state.gameState.verbNames);
  const sceneriesEditing = useSelector(state => state.editorState.sceneryEditing);
  const positionEditing = sceneriesEditing[scenery.id] || 'startPosition';

  const handleChange = (fieldName: keyof Scenery) => (value: Nullable<string>) => {
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
        <LongTextField
          label="open text"
          value={scenery.openText}
          onChange={handleChange('openText')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="moved text"
          value={scenery.movedText}
          onChange={handleChange('movedText')}
        />
      </Grid>
      <Grid item xs={12}>
        <Toggle
          value={positionEditing === 'endPosition'}
          onChange={checked => {
            dispatch(setSceneryEditing({
              position: checked ? 'endPosition' : 'startPosition',
              id: scenery.id,
            }));
          }}
          label={`Editing: ${positionEditing}`}
          tooltip="For animated scenery, determines which part (start or end) of the animation position is currently being edited"
        />
      </Grid>
      <Grid item xs={12}>
        <Selector
          label="trigger"
          value={scenery.trigger}
          onChange={handleChange('trigger')}
          options={verbNames.map((verb, index) => ({ value: index, label: verb.name }))}
        />
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="img"
          value={scenery.img}
          onChange={handleChange('img')}
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="visible flag"
          value={scenery.visibleFlag}
          onChange={handleChange('visibleFlag')}
        />
      </Grid>
      <Contains container={scenery} />
      <Verbs entity={scenery} />
    </Grid>
  );
};

export default SceneryDetails;

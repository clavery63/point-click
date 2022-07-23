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
import FlagsInput from '../shared/FlagsInput';

type Props = {
  scenery: Scenery;
};
const SceneryDetails = ({ scenery }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const verbs = useSelector(state => state.gameState.config.verbs);
  const sceneriesEditing = useSelector(state => state.editorState.sceneryEditing);
  const positionEditing = sceneriesEditing[scenery.id] || 'startPosition';

  const handleChange = (fieldName: keyof Scenery) => (value: Nullable<string> | string[]) => {
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
          tooltip="Convenience for editing. This name does not display in-game"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="description"
          value={scenery.description}
          onChange={handleChange('description')}
          tooltip="Text that displays by default whn the player 'LOOK's at this scenery"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="open text"
          value={scenery.openText}
          onChange={handleChange('openText')}
          tooltip="Custom text to display when the scenery is opened. Only relevant if the scenery contains items"
        />
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="moved text"
          value={scenery.movedText}
          onChange={handleChange('movedText')}
          tooltip="Custom text to display after animation has completed"
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
          options={verbs.map((verb, index) => ({ value: index, label: verb.name }))}
          tooltip="Which verb causes this scenery to animate"
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
        <FlagsInput
          label="visible flags"
          value={scenery.visibleFlags}
          onChange={handleChange('visibleFlags')}
          tooltip="When set, all of these flags must be on for this scenery to be visible (otherwise, the item is visible by default)"
        />
      </Grid>
      <Contains container={scenery} />
      <Verbs entity={scenery} />
    </Grid>
  );
};

export default SceneryDetails;

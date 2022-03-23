import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setVerb } from 'admin/store/reducers/gameStateReducer/configReducer/verbsReducer';
import { Nullable } from 'game/store/types';
import { setImageConfig } from 'admin/store/reducers/gameStateReducer/configReducer/imgReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';
import ImgSelector from '../shared/assets/ImgSelector';

const Settings = () => {
  const dispatch = useDispatch();
  const {
    verbs: allVerbs,
    img: imgConfig,
  } = useSelector(state => state.gameState.config);

  const handleChange = (verbName: Nullable<string>, index: number) => {
    if (!verbName) {
      console.log('You gotta have a verbName');
      return;
    }

    if (verbName.length < 1) {
      console.log('Each verbName must contain at least 1 character.');
      return;
    }
    if (verbName.length > 5) {
      console.log('Each verbName must contain at most 5 characters.');
      return;
    }

    dispatch(setVerb({
      verb: {
        name: verbName,
        defaultText: allVerbs[index].defaultText,
      },
      index,
    }));
  };

  const handleDefaultTextChange = (defaultText: Nullable<string>, index: number) => {
    if (!defaultText) {
      console.log('You gotta have text');
      return;
    }

    dispatch(setVerb({
      verb: {
        name: allVerbs[index].name,
        defaultText,
      },
      index,
    }));
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Settings:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ImgSelector
          label="cursor"
          value={imgConfig.cursor}
          onChange={imgName => dispatch(setImageConfig({
            ...imgConfig,
            cursor: imgName,
          }))}
          tooltip="Custom image to use as the cursor (defaults to that skeleton hand)"
        />
      </Grid>
      {allVerbs.map((verb, index) => (
        <Grid item xs={12} key={index}>
          <LongTextField
            label={`verb ${index} name`}
            value={verb.name}
            fullWidth={false}
            onChange={value => handleChange(value, index)}
          />
          <LongTextField
            label={`verb ${index} default text`}
            value={verb.defaultText}
            onChange={value => handleDefaultTextChange(value, index)}
          />
        </Grid>
      ))}
    </>
  );
};

export default Settings;

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setVerb } from 'admin/store/reducers/gameStateReducer/configReducer/verbNamesReducer';
import { Nullable } from 'game/store/types';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';

const Settings = () => {
  const dispatch = useDispatch();
  const allVerbs = useSelector(state => state.gameState.config.verbNames);

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

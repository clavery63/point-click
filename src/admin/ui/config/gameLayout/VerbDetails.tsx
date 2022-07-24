import React from 'react';
import { useSelector, useDispatch } from 'admin/ui/hooks/redux';
import { Stack, Typography } from '@mui/material';
import LongTextField from 'admin/ui/shared/LongTextField';
import { Nullable, VerbBehavior, VerbConfig } from 'game/store/types';
import { setVerb } from 'admin/store/reducers/gameStateReducer/configReducer/verbsReducer';
import Selector, { makeOptions } from 'admin/ui/shared/Selector';

const VerbDetails = () => {
  const dispatch = useDispatch();
  const verb = useSelector(state => {
    const { selectedEntity } = state.editorState;
    if (selectedEntity?.type === 'verbs') {
      return {
        ...state.gameState.present.config.verbs[selectedEntity.id],
        index: selectedEntity.id,
      };
    }
    return null;
  });

  if (!verb) {
    return null;
  }

  const handleChange = (key: keyof VerbConfig) => (value: Nullable<string | number>) => {
    const newVerb = {
      ...verb,
      [key]: value,
    };

    if (!newVerb.name) {
      console.log('You gotta have a verbName');
      return;
    }

    if (newVerb.name.length < 1) {
      console.log('Each verbName must contain at least 1 character.');
      return;
    }
    if (newVerb.name.length > 5) {
      console.log('Each verbName must contain at most 5 characters.');
      return;
    }

    if (!newVerb.defaultText && newVerb.defaultBehavior === VerbBehavior.NONE) {
      console.log('OK, look. You gotta have either defaultText or defaultBehavior.');
      return;
    }

    dispatch(setVerb({
      verb: newVerb,
      index: newVerb.index,
    }));
  };

  return (
    <Stack direction="column" key={verb.index}>
      <Typography variant="h6">
        Edit Verb
        {' '}
        {verb.index}
      </Typography>
      <LongTextField
        label="name"
        value={verb.name}
        fullWidth={false}
        onChange={handleChange('name')}
      />
      <LongTextField
        label="default text"
        value={verb.defaultText}
        onChange={handleChange('defaultText')}
      />
      <Selector
        required
        label="default behavior"
        value={verb.defaultBehavior}
        onChange={handleChange('defaultBehavior')}
        options={makeOptions(Object.values(VerbBehavior))}
        tooltip="This defines default behavior for when you don't supply any behavior for a particular object + verb."
      />
    </Stack>
  );
};

export default VerbDetails;

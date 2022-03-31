import React from 'react';
import { useSelector, useDispatch } from 'admin/ui/hooks/redux';
import { Stack } from '@mui/material';
import LongTextField from 'admin/ui/shared/LongTextField';
import { Nullable } from 'game/store/types';
import { setVerb } from 'admin/store/reducers/gameStateReducer/configReducer/verbsReducer';

const VerbDetails = () => {
  const dispatch = useDispatch();
  const verb = useSelector(state => {
    const { selectedEntity } = state.editorState;
    if (selectedEntity?.type === 'verbs') {
      return {
        ...state.gameState.config.verbs[selectedEntity.id],
        index: selectedEntity.id,
      };
    }
    return null;
  });

  if (!verb) {
    return null;
  }

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
        defaultText: verb.defaultText,
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
        name: verb.name,
        defaultText,
      },
      index,
    }));
  };

  return (
    <Stack direction="row" spacing={2} key={verb.index}>
      <LongTextField
        label={`verb ${verb.index} name`}
        value={verb.name}
        fullWidth={false}
        onChange={value => handleChange(value, verb.index)}
      />
      <LongTextField
        label={`verb ${verb.index} default text`}
        value={verb.defaultText}
        onChange={value => handleDefaultTextChange(value, verb.index)}
      />
    </Stack>
  );
};

export default VerbDetails;

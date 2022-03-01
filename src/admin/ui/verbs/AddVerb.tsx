import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { setEntityVerb } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { VerbIndex } from 'game/store/types';
import range from 'lodash/range';
import DispatchButton from '../shared/DispachButton';
import Selector from '../shared/Selector';

type Props = {
  indexes: number[];
  names: string[];
  entityId: number;
};
const AddVerb = ({ indexes, names, entityId }: Props) => {
  const remainingIndexes = range(9).filter(i => !indexes.includes(i));
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(remainingIndexes[0]);
  const options = remainingIndexes.map(index => ({ value: index, label: names[index] }));

  if (!remainingIndexes.length) {
    return null;
  }

  return (
    <Stack>
      <DispatchButton
        action={setEntityVerb({
          id: entityId,
          verbIndex: selectedVerbIndex as VerbIndex,
          verbLogics: [],
        })}
        callToAction="Add Verb"
      />
      <Selector
        required
        label="verb to add"
        value={selectedVerbIndex}
        onChange={val => setSelectedVerbIndex(parseInt(val, 10))}
        options={options}
      />
    </Stack>
  );
};

export default AddVerb;

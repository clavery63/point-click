import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setEntityVerb } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { VerbIndex } from 'game/store/types';
import range from 'lodash/range';
import DispatchButton from '../shared/DispachButton';
import Selector from '../shared/Selector';

const useStyles = makeStyles({
  addVerb: {
    margin: '20px 0',
  },
});

type Props = {
  indexes: number[];
  names: string[];
  entityId: number;
};
const AddVerb = ({ indexes, names, entityId }: Props) => {
  const styles = useStyles();
  const remainingIndexes = range(9).filter(i => !indexes.includes(i));
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(remainingIndexes[0]);
  const options = remainingIndexes.map(index => ({ value: index, label: names[index] }));

  if (!remainingIndexes.length) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} className={styles.addVerb}>
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

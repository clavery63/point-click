import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setEntityVerb } from 'admin/store/reducers/gameStateReducer/worldStateReducer/entitiesReducer';
import { VerbIndex } from 'game/store/types';
import range from 'lodash/range';
import Selector from '../shared/Selector';
import { useDispatch } from '../hooks/redux';

const useStyles = makeStyles({
  addVerb: {
    margin: '20px 0',
    alignItems: 'center',
  },
});

type Props = {
  indexes: number[];
  names: string[];
  entityId: number;
};
const AddVerb = ({ indexes, names, entityId }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const remainingIndexes = range(9).filter(i => !indexes.includes(i));
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(remainingIndexes[0]);
  const options = remainingIndexes.map(index => ({ value: index, label: names[index] }));

  const onClick = () => {
    // We update the selection eagerly to ensure the selector is in a valid state
    // whenever rendered.
    const remaining = remainingIndexes.filter(i => i !== selectedVerbIndex);
    setSelectedVerbIndex(remaining[0]);
    dispatch(setEntityVerb({
      id: entityId,
      verbIndex: selectedVerbIndex as VerbIndex,
      verbLogics: [],
    }));
  };

  if (!remainingIndexes.length) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} className={styles.addVerb}>
      <Button
        variant="contained"
        onClick={onClick}
      >
        Add Verb
      </Button>
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

import React from 'react';
import { DoorDir, VerbLogic } from 'game/store/types';
import {
  Box, Button, Card, CardContent, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LongTextField from '../shared/LongTextField';
import Selector, { makeOptions } from '../shared/Selector';
import { useSelector } from '../hooks/redux';
import splitString from '../utils/splitString';
import Condition from './Condition';
import FlagsInput from '../shared/FlagsInput';

const useStyles = makeStyles({
  verbCard: {
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

type Props = {
  index: number;
  verb: VerbLogic;
  handleChange: (index: number, verb: VerbLogic) => void;
  handleDelete: (index: number) => void;
};
const Verb = ({
  verb, index, handleChange, handleDelete,
}: Props) => {
  const styles = useStyles();
  const allRoomIds = useSelector(state => Object.keys(state.gameState.worldState.rooms));
  const allEntityIds = useSelector(state => Object.keys(state.gameState.worldState.entities));

  const onChange = (fieldName: keyof VerbLogic) => (value: any) => {
    handleChange(index, {
      ...verb,
      // TODO: what we probably want is to convert empty strings to undefined
      // in the Selector and whatever other components have this problem
      [fieldName]: value || undefined,
    });
  };

  return (
    <Card className={styles.verbCard}>
      <CardContent>
        <Typography variant="body1" display="block" margin="10px">
          Case
          {' '}
          {index + 1}
        </Typography>
        <LongTextField
          label="text"
          value={verb.text}
          onChange={onChange('text')}
        />
        <Selector
          label="move to"
          value={verb.moveTo}
          onChange={val => onChange('moveTo')(val ? parseInt(val, 10) : undefined)}
          options={makeOptions(allRoomIds)}
        />
        <Selector
          label="animation direction"
          value={verb.moveDir}
          onChange={onChange('moveDir')}
          options={makeOptions(Object.keys(DoorDir))}
        />
        <FlagsInput
          label="add flags"
          value={verb.addFlags}
          onChange={newFlags => onChange('addFlags')(newFlags)}
        />
        <FlagsInput
          label="remove flags"
          value={verb.removeFlags}
          onChange={newFlags => onChange('removeFlags')(newFlags)}
        />
        <FlagsInput
          label="prereq flags"
          value={verb.prereqFlags}
          onChange={newFlags => onChange('prereqFlags')(newFlags)}
        />
        <Selector
          label="prereq using"
          value={verb.prereqUsing}
          onChange={val => onChange('prereqUsing')(parseInt(val, 10))}
          options={makeOptions(allEntityIds)}
          style={{ width: '150px' }}
        />
        <Condition
          condition={verb.condition}
          onChange={onChange('condition')}
        />
        <Box>
          <Button onClick={() => handleDelete(index)} color="error">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Verb;

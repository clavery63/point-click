import {
  Card, CardContent, Stack, Typography,
} from '@mui/material';
import { DialogAnswer, DialogAnswers } from 'game/store/types';
import React, { useCallback } from 'react';
import FlagsInput from '../shared/FlagsInput';
import LongTextField from '../shared/LongTextField';

type Props = {
  onChange: (answers: DialogAnswers) => void;
  answers: DialogAnswers;
  index: 0 | 1 | 2 | 3;
};
const DialogAnswerEdit = ({ onChange, answers, index }: Props) => {
  const answer = answers[index];

  const handleChange = useCallback((fieldName: keyof DialogAnswer) => useCallback((value: any) => {
    const newAnswers: DialogAnswers = [...answers];
    const newAnswer = {
      ...answers[index],
      [fieldName]: value,
    };

    newAnswers[index] = newAnswer;
    onChange(newAnswers);
  }, [fieldName, answers, index]), [answers, index]);

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" display="block" margin="10px">
          Answer
          {' '}
          {index + 1}
        </Typography>
        <Stack direction="column">
          <LongTextField
            label="text"
            value={answer.text}
            onChange={handleChange('text')}
          />
          <FlagsInput
            label="add flags"
            value={answer.addFlags}
            onChange={handleChange('addFlags')}
          />
          <FlagsInput
            label="remove flags"
            value={answer.removeFlags}
            onChange={handleChange('removeFlags')}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DialogAnswerEdit;

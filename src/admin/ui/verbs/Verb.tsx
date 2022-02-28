import React from 'react';
import Typography from '@mui/material/Typography';
import { VerbLogic } from 'game/store/types';
import LongTextField from '../shared/LongTextField';

type Props = {
  index: number;
  verb: VerbLogic;
  handleChange: (index: number, verb: VerbLogic) => void;
};
const Verb = ({ verb, index, handleChange }: Props) => {
  const onChange = (fieldName: keyof VerbLogic) => (value: any) => {
    handleChange(index, {
      ...verb,
      [fieldName]: value,
    });
  };

  return (
    <>
      <Typography>{index}</Typography>
      <LongTextField
        label="text"
        value={verb.text}
        onChange={onChange('text')}
      />
    </>
  );
};

export default Verb;

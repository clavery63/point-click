import React from 'react';
import { VerbIndex, VerbLogic } from 'game/store/types';
import { Typography } from '@mui/material';
import Verb from './Verb';

type Props = {
  verbIndex: VerbIndex;
  verbLogics: VerbLogic[];
  verbName: string;
  handleChange: (verbIndex: VerbIndex, verbLogics: VerbLogic[]) => void;
};
const VerbList = ({
  verbIndex, verbLogics, handleChange, verbName,
}: Props) => {
  const onChange = (index: number, verb: VerbLogic) => {
    const newVerbLogics = [...verbLogics];
    newVerbLogics[index] = verb;
    handleChange(verbIndex, newVerbLogics);
  };

  return (
    <>
      <Typography>{verbName}</Typography>
      {verbLogics.map((verb, index) => (
        <Verb
          key={index}
          verb={verb}
          index={index}
          handleChange={onChange}
        />
      ))}
    </>
  );
};

export default VerbList;

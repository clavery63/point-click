import React from 'react';
import { VerbIndex, VerbLogic } from 'game/store/types';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Verb from './Verb';

type Props = {
  verbIndex: VerbIndex;
  verbLogics: VerbLogic[];
  verbName: string;
  handleChange: (verbIndex: VerbIndex, verbLogics?: VerbLogic[]) => void;
};
const VerbList = ({
  verbIndex, verbLogics, handleChange, verbName,
}: Props) => {
  const onChange = (index: number, verb: VerbLogic) => {
    const newVerbLogics = [...verbLogics];
    newVerbLogics[index] = verb;
    handleChange(verbIndex, newVerbLogics);
  };

  const onDelete = (index: number) => {
    const newVerbLogics = [...verbLogics];
    newVerbLogics.splice(index, 1);
    handleChange(verbIndex, newVerbLogics);
  };

  const onCreate = () => {
    handleChange(verbIndex, [...verbLogics, {}]);
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{verbName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {verbLogics.map((verb, index) => (
          <Verb
            key={index}
            verb={verb}
            index={index}
            handleChange={onChange}
            handleDelete={onDelete}
          />
        ))}
        <Box>
          <Button onClick={onCreate}>
            Add Logic
          </Button>
          <IconButton
            onClick={() => handleChange(verbIndex)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default VerbList;

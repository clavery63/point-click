import {
  Box,
  Button,
  Card, CardContent, Stack, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { editDialogPage } from 'admin/store/reducers/gameStateReducer/worldStateReducer/dialogsReducer';
import { DialogPage } from 'game/store/types';
import React from 'react';
import { useDispatch } from '../hooks/redux';
import FlagsInput from '../shared/FlagsInput';
import LongTextField from '../shared/LongTextField';

const useStyles = makeStyles({
  dialogPageCard: {
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

type Props = {
  dialogId: number;
  index: number;
  dialogPage: DialogPage;
};
const DialogPageEdit = ({ dialogId, index, dialogPage }: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleChange = (fieldName: keyof DialogPage) => (value: any) => {
    dispatch(editDialogPage({
      id: dialogId,
      pageIndex: index,
      page: {
        ...dialogPage,
        [fieldName]: value,
      },
    }));
  };

  return (
    <Card className={styles.dialogPageCard}>
      <CardContent>
        <Typography variant="body1" display="block" margin="10px">
          Page
          {' '}
          {index + 1}
        </Typography>
        <Stack direction="column">
          <LongTextField
            label="question"
            value={dialogPage.question}
            onChange={handleChange('question')}
          />
          <LongTextField
            label="first answer"
            value={dialogPage.answerOne}
            onChange={handleChange('answerOne')}
          />
          <LongTextField
            label="second answer"
            value={dialogPage.answerTwo}
            onChange={handleChange('answerTwo')}
          />
          <LongTextField
            label="third answer"
            value={dialogPage.answerThree}
            onChange={handleChange('answerThree')}
          />
          <LongTextField
            label="fourth answer"
            value={dialogPage.answerFour}
            onChange={handleChange('answerFour')}
          />
          <FlagsInput
            label="add flags"
            value={dialogPage.addFlags}
            onChange={newFlags => handleChange('addFlags')(newFlags)}
          />
          <FlagsInput
            label="remove flags"
            value={dialogPage.removeFlags}
            onChange={newFlags => handleChange('removeFlags')(newFlags)}
          />
          <FlagsInput
            label="prereq flags"
            value={dialogPage.prereqFlags}
            onChange={newFlags => handleChange('prereqFlags')(newFlags)}
          />
        </Stack>
        <Box>
          <Button onClick={() => console.log('deleting dialog page:', index)} color="error">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DialogPageEdit;

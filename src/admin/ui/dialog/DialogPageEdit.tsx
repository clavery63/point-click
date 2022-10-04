import {
  Card, CardContent, IconButton, Stack, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deleteDialogPage, editDialogPage } from 'admin/store/reducers/gameStateReducer/worldStateReducer/dialogsReducer';
import { DialogPage } from 'game/store/types';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback } from 'react';
import { useDispatch } from '../hooks/redux';
import FlagsInput from '../shared/FlagsInput';
import LongTextField from '../shared/LongTextField';
import DialogAnswerEdit from './DialogAnswerEdit';

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

  const handleChange = useCallback((fieldName: keyof DialogPage) => useCallback((value: any) => {
    dispatch(editDialogPage({
      id: dialogId,
      pageIndex: index,
      page: {
        ...dialogPage,
        [fieldName]: value,
      },
    }));
  }, [fieldName, dialogId, index, dialogPage]), [dialogId, index, dialogPage]);

  const handleDelete = (id: number, pageIndex: number) => {
    dispatch(deleteDialogPage({ id, pageIndex }));
  };

  if (!dialogPage) {
    return null;
  }

  return (
    <Card className={styles.dialogPageCard}>
      <CardContent>
        <Stack direction="row">
          <Typography variant="body1" display="block" margin="10px">
            Page
            {' '}
            {index + 1}
          </Typography>
          <IconButton
            onClick={() => handleDelete(dialogId, index)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
        <Stack direction="column">
          <FlagsInput
            label="prereq flags"
            value={dialogPage.prereqFlags}
            onChange={handleChange('prereqFlags')}
          />
          <LongTextField
            label="question"
            value={dialogPage.question}
            onChange={handleChange('question')}
          />
          {[0, 1, 2, 3].map((answerIndex) => (
            <DialogAnswerEdit
              key={answerIndex}
              answers={dialogPage.answers}
              onChange={handleChange('answers')}
              index={answerIndex as 0 | 1 | 2 | 3}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DialogPageEdit;

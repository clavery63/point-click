import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Scenery } from 'game/store/types';
import { createDialog } from 'admin/store/epics/createObject';
import { addPageToDialog } from 'admin/store/reducers/gameStateReducer/worldStateReducer/dialogsReducer';
import { Button } from '@mui/material';
import { useSelector } from '../hooks/redux';
import DispatchButton from '../shared/DispatchButton';
import DialogPageEdit from './DialogPageEdit';
import DialogAvatarEdit from './DialogAvatarEdit';

type Props = {
  scenery: Scenery;
};
const DialogEdit = ({ scenery }: Props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const existingDialog = useSelector(state => {
    const dialogId = scenery.dialog == null ? -1 : scenery.dialog;
    return state.gameState.present.worldState.dialogs[dialogId];
  });

  useEffect(() => {
    if (existingDialog && currentPageIndex >= existingDialog.pages.length) {
      setCurrentPageIndex(existingDialog.pages.length - 1);
    }
  }, [existingDialog?.pages, currentPageIndex]);

  const currentPage = useMemo(() => {
    return existingDialog?.pages[currentPageIndex];
  }, [existingDialog, currentPageIndex]);

  if (!existingDialog) {
    return (
      <DispatchButton
        action={createDialog(scenery.id)}
        callToAction="Create New Dialog"
      />
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">
          Edit Dialog:
        </Typography>
        <Typography variant="body1">
          Use this to trigger a dialog screen when using the SPEAK verb behavior
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DialogAvatarEdit dialogId={existingDialog.id} />
      </Grid>
      <Grid item xs={12}>
        Pages:
        {' '}
        {existingDialog.pages.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPageIndex(index)}
            disabled={index === currentPageIndex}
          >
            {index + 1}
          </Button>
        ))}
        <DispatchButton
          action={addPageToDialog({ id: existingDialog.id })}
          callToAction="Add Page"
        />
      </Grid>
      <Grid item xs={12}>
        <DialogPageEdit
          index={currentPageIndex}
          dialogId={existingDialog.id}
          dialogPage={currentPage}
        />
      </Grid>
    </>
  );
};

export default DialogEdit;

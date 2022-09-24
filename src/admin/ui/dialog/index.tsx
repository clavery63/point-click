import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Scenery } from 'game/store/types';
import { createDialog } from 'admin/store/epics/createObject';
import { addPageToDialog } from 'admin/store/reducers/gameStateReducer/worldStateReducer/dialogsReducer';
import { useSelector } from '../hooks/redux';
import DispatchButton from '../shared/DispatchButton';
import DialogPageEdit from './DialogPageEdit';
import DialogAvatarEdit from './DialogAvatarEdit';

type Props = {
  scenery: Scenery;
};
const DialogEdit = ({ scenery }: Props) => {
  const existingDialog = useSelector(state => {
    const dialogId = scenery.dialog == null ? -1 : scenery.dialog;
    return state.gameState.present.worldState.dialogs[dialogId];
  });

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
      </Grid>
      <Grid item xs={12}>
        <DialogAvatarEdit dialogId={existingDialog.id} />
      </Grid>
      <Grid item xs={12}>
        {existingDialog.pages.map((dialogPage, index) => (
          <DialogPageEdit
            key={index}
            index={index}
            dialogId={existingDialog.id}
            dialogPage={dialogPage}
          />
        ))}
      </Grid>
      <DispatchButton
        action={addPageToDialog({ id: existingDialog.id })}
        callToAction="Add Dialog Page"
      />
    </>
  );
};

export default DialogEdit;

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Dialog, Scenery } from 'game/store/types';
import { createDialog } from 'admin/store/epics/createObject';
import { useDispatch, useSelector } from '../hooks/redux';
import DispatchButton from '../shared/DispatchButton';
import DialogPageEdit from './DialogPageEdit';

type Props = {
  scenery: Scenery;
};
const DialogEdit = ({ scenery }: Props) => {
  const dispatch = useDispatch();
  const existingDialog = useSelector(state => {
    const dialogId = scenery.dialog || -1;
    return state.gameState.present.worldState.dialogs[dialogId];
  });

  const handleChange = (dialog: Dialog) => {
    console.log('dialog:', {
      id: dialog.id,
      dialog,
    });
  };

  const handleCreate = () => {
    console.log('creating it:', scenery.id);
  };

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
        {existingDialog.pages.map((dialogPage, index) => (
          <DialogPageEdit
            key={index}
            index={index}
            dialogPage={dialogPage}
          />
        ))}
      </Grid>
      {/* <AddVerb
        indexes={verbIndexPairings.map(([index]) => parseInt(index, 10))}
        names={verbs.map(verb => verb.name)}
        entityId={entity.id}
      /> */}
    </>
  );
};

export default DialogEdit;

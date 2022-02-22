import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import GameRoot from 'game/GameRoot';
import { clearPreview } from 'admin/store/reducers/previewReducer';
import { useSelector, useDispatch } from '../hooks/redux';

const GamePreview = () => {
  const dispatch = useDispatch();
  const previewState = useSelector(state => state.previewState);
  const gameName = useSelector(state => state.gameName);

  if (!previewState) {
    return null;
  }

  return (
    <Dialog
      open={!!previewState}
      onClose={() => dispatch(clearPreview())}
      maxWidth={false}
    >
      <DialogContent style={{ width: '80vw', height: '80vh' }}>
        <GameRoot gameName={gameName} state={previewState} />
      </DialogContent>
    </Dialog>
  );
};

export default GamePreview;

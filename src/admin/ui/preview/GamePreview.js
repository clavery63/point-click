import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import GameRoot from 'game/GameRoot';

const GamePreview = () => {
  const dispatch = useDispatch();
  const previewState = useSelector(state => state.previewState);
  const gameName = useSelector(state => state.gameName);
  const clearPreview = () => dispatch(({ type: 'CLEAR_PREVIEW' }));

  if (!previewState) {
    return null;
  }

  return (
    <Dialog
      open={!!previewState}
      onClose={clearPreview}
      maxWidth={false}
    >
      <DialogContent style={{width: '80vw', height: '80vh'}}>
        <GameRoot gameName={gameName} state={previewState} />
      </DialogContent>
    </Dialog>
  )
};

export default GamePreview;

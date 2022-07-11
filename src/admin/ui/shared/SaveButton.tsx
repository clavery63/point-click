import React from 'react';
import Button from '@mui/material/Button';
import useUpload, { UploadState } from '../hooks/useUpload';

const getCallToAction = (uploadState: UploadState) => {
  switch (uploadState) {
    case UploadState.IN_PROGRESS:
      return 'Saving Game...';
    case UploadState.COMPLETE:
      return 'Saved Game!';
    case UploadState.ERROR:
      return 'Something went wrong (check console)';
    default:
      return 'Save Game';
  }
};

const SaveButton = () => {
  const { upload, uploadState } = useUpload('gamedata-draft.json');
  const callToAction = getCallToAction(uploadState);

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={uploadState !== UploadState.NONE}
      onClick={upload}
      sx={{ ml: 1, mr: 1 }}
    >
      {callToAction}
    </Button>
  );
};

export default SaveButton;

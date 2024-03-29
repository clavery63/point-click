import React from 'react';
import Button from '@mui/material/Button';
import useUpload, { UploadState } from '../hooks/useUpload';
import useCommand from '../hooks/useCommand';

const getCallToAction = (uploadState: UploadState) => {
  switch (uploadState) {
    case UploadState.IN_PROGRESS:
      return 'Saving...';
    case UploadState.COMPLETE:
      return 'Saved!';
    case UploadState.ERROR:
      return 'Something went wrong (check console)';
    default:
      return 'Save';
  }
};

const SaveButton = () => {
  const { upload, uploadState } = useUpload('gamedata-draft.json');
  useCommand('s', upload);
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

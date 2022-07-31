import Button from '@mui/material/Button';
import React from 'react';
import useUpload, { UploadState } from '../hooks/useUpload';

const getCallToAction = (uploadState: UploadState) => {
  switch (uploadState) {
    case UploadState.IN_PROGRESS:
      return 'Publishing...';
    case UploadState.COMPLETE:
      return 'Published!';
    case UploadState.ERROR:
      return 'Something went wrong (check console)';
    default:
      return 'Publish';
  }
};

const PublishButton = () => {
  const { upload, uploadState } = useUpload('gamedata.json');
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

export default PublishButton;

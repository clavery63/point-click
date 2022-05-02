import { uploadGame, UploadState } from 'admin/store/reducers/editorStateReducer/uploadStateReducer';
import React from 'react';
import { useSelector } from '../hooks/redux';
import DispatchButton from './DispatchButton';

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
  const uploadState = useSelector(state => state.editorState.uploadState);
  const callToAction = getCallToAction(uploadState);

  return (
    <DispatchButton
      action={uploadGame('gamedata.json')}
      callToAction={callToAction}
      color="primary"
      disabled={uploadState !== UploadState.NONE}
    />
  );
};

export default PublishButton;

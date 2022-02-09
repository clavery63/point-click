import { uploadGame, UploadState } from 'admin/store/reducers/editorStateReducer/uploadStateReducer';
import React from 'react';
import { useSelector } from '../hooks/redux';
import DispatchButton from './DispachButton';

const getCallToAction = (uploadState: UploadState) => {
  switch (uploadState) {
    case UploadState.IN_PROGRESS:
      return 'Saving...';
    case UploadState.COMPLETE:
      return 'Saved!';
    default:
      return 'Save';
  }
};

const UploadButton = () => {
  const uploadState = useSelector(state => state.editorState.uploadState);
  const callToAction = getCallToAction(uploadState);

  return (
    <DispatchButton
      action={uploadGame()}
      callToAction={callToAction}
      color="primary"
      disabled={uploadState !== UploadState.NONE}
    />
  );
};

export default UploadButton;

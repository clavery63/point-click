import { uploadGame } from 'admin/store/epics/upload';
import React from 'react';
import DispatchButton from './DispachButton';

const UploadButton = () => (
  <DispatchButton
    action={uploadGame()}
    callToAction="Save"
  />
);

export default UploadButton;

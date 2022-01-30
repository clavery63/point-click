import React from 'react';
import DispatchButton from './DispachButton';

const UploadButton = () => (
  <DispatchButton
    action={{ type: 'UPLOAD_GAME' }}
    callToAction='Save'
  />
);

export default UploadButton;

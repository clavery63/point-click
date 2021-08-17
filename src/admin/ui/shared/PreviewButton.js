import React from 'react';
import DispatchButton from './DispachButton';

const PreviewButton = ({ roomId }) => (
  <DispatchButton
    action={'START_PREVIEW'}
    callToAction='Preview'
    payload={roomId}
  />
);

export default PreviewButton;

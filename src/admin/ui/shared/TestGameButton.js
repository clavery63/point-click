import React from 'react';
import DispatchButton from './DispachButton';

const PreviewButton = ({ roomId }) => (
  <DispatchButton
    action={'START_PREVIEW'}
    callToAction='Test Game'
    payload={roomId}
  />
);

export default PreviewButton;

import React from 'react';
import DispatchButton from './DispachButton';

const PreviewButton = ({ roomId }) => (
  <DispatchButton
    action={{
      type: 'START_PREVIEW',
      payload: roomId
    }}
    callToAction='Test Game'
  />
);

export default PreviewButton;

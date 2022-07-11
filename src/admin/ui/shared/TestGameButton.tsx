import { startPreview } from 'admin/store/epics/preview';
import React from 'react';
import DispatchButton from './DispatchButton';

type Props = {
  roomId: number;
};
const PreviewButton = ({ roomId }: Props) => (
  <DispatchButton
    action={startPreview(roomId)}
    callToAction="Test Play This Room"
  />
);

export default PreviewButton;

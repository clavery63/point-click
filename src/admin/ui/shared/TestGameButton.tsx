import { startPreview } from 'admin/store/epics/preview';
import React from 'react';
import DispatchButton from './DispachButton';

type Props = {
  roomId: number;
};
const PreviewButton = ({ roomId }: Props) => (
  <DispatchButton
    action={startPreview(roomId)}
    callToAction="Test Game"
  />
);

export default PreviewButton;

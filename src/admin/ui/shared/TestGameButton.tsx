import { startPreview } from 'admin/store/epics/preview';
import React from 'react';
import DispatchButton from './DispatchButton';

type Props = {
  roomId?: number;
};
const TestGameButton = ({ roomId }: Props) => {
  if (roomId == null) {
    return null;
  }
  return (
    <DispatchButton
      action={startPreview(roomId)}
      callToAction="Preview This Room"
    />
  );
};
export default TestGameButton;

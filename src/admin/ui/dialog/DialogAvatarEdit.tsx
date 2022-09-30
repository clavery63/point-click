import { editDialogAvatar } from 'admin/store/reducers/gameStateReducer/worldStateReducer/dialogsReducer';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from '../hooks/redux';
import ImgSelector from '../shared/assets/ImgSelector';

type Props = { dialogId: number };
const DialogAvatarEdit = ({ dialogId }: Props) => {
  const dispatch = useDispatch();
  const dialog = useSelector(state => state.gameState.present.worldState.dialogs[dialogId]);

  const handleChange = useCallback(avatar => dispatch(editDialogAvatar({
    dialogId,
    avatar,
  })), [dialogId]);

  return (
    <ImgSelector
      label="avatar"
      value={dialog?.avatar}
      onChange={handleChange}
      tooltip="Avatar to display during this dialog"
      width={45}
      height={60}
      exactSize
    />
  );
};

export default DialogAvatarEdit;

import { DialogPage } from 'game/store/types';
import React from 'react';

type Props = {
  index: number;
  dialogPage: DialogPage;
};
const DialogPageEdit = ({ index, dialogPage }: Props) => {
  return (
    <>
      {index}
      {dialogPage.question}
    </>
  );
};

export default DialogPageEdit;

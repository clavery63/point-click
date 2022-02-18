import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FileUploader from './FileUploader';

type Props = {
  validate: (f: File) => Promise<void>;
  onSuccess: (f: File) => Promise<void>;
};
const FileUploaderButton = ({ validate, onSuccess }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Upload File
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={false}
      >
        <DialogContent>
          <FileUploader validate={validate} onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileUploaderButton;

// style={{ width: '80vw', height: '80vh' }}

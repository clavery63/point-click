import React from 'react';
import { useSelector } from 'admin/ui/hooks/redux';
import { Stack, Typography } from '@mui/material';

const MiscInfo = () => {
  const miscInfo = useSelector(state => state.editorState.miscInfo);

  if (!miscInfo) {
    return null;
  }

  return (
    <Stack direction="column">
      <Typography variant="h6">
        {miscInfo}
      </Typography>
    </Stack>
  );
};

export default MiscInfo;

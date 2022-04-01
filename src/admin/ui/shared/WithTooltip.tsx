import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Help from '@mui/icons-material/Help';
import { makeStyles } from '@mui/styles';
import { useSelector } from '../hooks/redux';

const useStyles = makeStyles({
  tooltip: {
    position: 'absolute',
    top: '2px',
    right: '10px',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
});

type Props = {
  text?: string;
  children: React.ReactNode;
  top?: string;
};
const WithTooltip = ({ text, children, top }: Props) => {
  const tooltipsEnabled = useSelector(state => state.editorState.tooltips);
  const classes = useStyles();
  const styleOverride = top ? { top } : {};

  return (
    <Box style={{ position: 'relative', display: 'inline' }}>
      {children}
      {tooltipsEnabled && text && (
        <Tooltip title={text}>
          <Box className={classes.tooltip} style={styleOverride}>
            <Icon>
              <Help sx={{ fontSize: 16 }} />
            </Icon>
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default WithTooltip;

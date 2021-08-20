import { makeStyles } from '@material-ui/core';
import { VIEWPORT_SIZE, SCALE } from './constants';

const useStyles = makeStyles({
  viewport: {
    width: `${VIEWPORT_SIZE * SCALE}px`,
    height: `${VIEWPORT_SIZE * SCALE}px`,
    position: 'relative'
  },
  background: {
    width: '100%',
    height: '100%'
  },
  entity: {
    position: 'absolute',
    '&:hover': {
      cursor: 'pointer'
    },
  }
});

export default useStyles;

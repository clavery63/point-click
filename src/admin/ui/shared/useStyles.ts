import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  leftColumn: {
    width: `${5 * 112}px`,
    float: 'left',
    padding: '10px 40px 10px 10px',
  },
  rightColumn: {
    width: `calc(100vw - ${5 * 112 + 50}px)`,
    float: 'left',
  },
  field: {
    margin: '10px 20px 10px 0',
  },
  roomsPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px 0 0',
  },
  roomPreview: {
    width: '200px',
    height: '200px',
    margin: '0 20px 20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomImg: {
    height: '100%',
    width: '100%',
  },
  roomVideo: {
    height: '50%',
    width: '50%',
  },
}, { index: 1 });

export default useStyles;

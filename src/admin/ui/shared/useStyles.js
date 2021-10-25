import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  leftColumn: {
    width: `${5 * 112}px`,
    float: 'left',
    margin: '10px 40px 10px 10px'
  },
  rightColumn: {
    width: '50%'
  },
  field: {
    margin: '10px 20px 10px 0'
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
    justifyContent: 'center'
  },
  roomImg: {
    height: '100%',
    width: '100%',
  },
  roomVideo: {
    height: '50%',
    width: '50%',
  },
});

export default useStyles;

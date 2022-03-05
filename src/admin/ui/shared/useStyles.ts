import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  leftColumn: {
    width: `${5 * 112}px`,
    float: 'left',
    padding: '20px',
  },
  rightColumn: {
    width: `calc(100vw - ${5 * 112 + 80}px)`,
    maxWidth: '620px',
    float: 'left',
    padding: '20px',
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
    position: 'relative',
    width: '200px',
    height: '200px',
    margin: '0 20px 20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      '& $deleteButton': {
        opacity: 1,
      },
    },
  },
  roomLink: {
    height: '100%',
    width: '100%',
  },
  videoLink: {
    height: '100%',
    width: '100%',
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
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0,
  },
}, { index: 1 });

export default useStyles;

import React from 'react';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Videocam from '@mui/icons-material/Videocam';
import { Room } from 'game/store/types';
import { createRoom, deleteRoom } from 'admin/store/reducers/gameStateReducer/worldStateReducer/roomsReducer';
import { Button, IconButton, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from '../hooks/redux';
import useStyles from '../shared/useStyles';
import { CreateObjectButton } from './ObjectsList';

const baseUrl = process.env.REACT_APP_ASSETS_BASE;

type RoomImgProps = {
  img: string;
};
const RoomImg = ({ img }: RoomImgProps) => {
  const classes = useStyles();
  const { gameName } = useParams<{ gameName: string }>();
  const imgUrl = `${baseUrl}/${gameName}/img/${img}.png`;

  return (
    <Tooltip title={img}>
      <img className={classes.roomImg} src={imgUrl} alt={img} />
    </Tooltip>
  );
};

type RoomVideoProps = {
  video: string;
};
const RoomVideo = ({ video }: RoomVideoProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.videoLink}>
      <Tooltip title={video}>
        <Videocam className={classes.roomVideo} />
      </Tooltip>
    </Box>
  );
};

type DeleteButtonProps = { room: Room; id: number };
const DeleteButton = ({ room, id }: DeleteButtonProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Box className={classes.deleteButton}>
      <IconButton
        onClick={e => {
          e.stopPropagation();
          dispatch(deleteRoom({ room, id }));
        }}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

type RoomCardProps = {
  room: Room;
  id: string;
};
const RoomCard = ({ room, id }: RoomCardProps) => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { img, video } = room;

  return (
    <Card className={classes.roomPreview}>
      <Link to={`${url}/${id}`} className={classes.roomLink}>
        {img && <RoomImg img={img} />}
        {video && <RoomVideo video={video} />}
      </Link>
      <DeleteButton room={room} id={parseInt(id, 10)} />
    </Card>
  );
};

const ListRooms = () => {
  const { gameName } = useParams<{ gameName: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.gameState.worldState.rooms);

  const onCreate = () => {
    dispatch(createRoom());
  };

  return (
    <Box className={classes.roomsPreview}>
      <Box style={{ width: '100%' }}>
        <Link to={`/admin/${gameName}`}>
          <Button
            startIcon={<ArrowBack>back</ArrowBack>}
          >
            To Home
          </Button>
        </Link>
      </Box>
      {Object.entries(rooms).map(([id, room]) => (
        <RoomCard key={id} id={id} room={room} />
      ))}
      <Box className={classes.roomPreview}>
        <Typography>Create Room</Typography>
        <CreateObjectButton onAdd={onCreate} />
      </Box>
    </Box>
  );
};

export default ListRooms;

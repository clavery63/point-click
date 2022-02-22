import React from 'react';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Videocam from '@mui/icons-material/Videocam';
import { Room } from 'game/store/types';
import { useSelector } from '../hooks/redux';
import useStyles from '../shared/useStyles';

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
    <Tooltip title={video}>
      <Videocam className={classes.roomVideo} />
    </Tooltip>
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
    <Link to={`${url}/${id}`}>
      <Card className={classes.roomPreview}>
        {img && <RoomImg img={img} />}
        {video && <RoomVideo video={video} />}
      </Card>
    </Link>
  );
};

const ListRooms = () => {
  const classes = useStyles();
  const rooms = useSelector(state => state.gameState.worldState.rooms);

  return (
    <Box className={classes.roomsPreview}>
      {Object.entries(rooms).map(([id, room]) => (
        <RoomCard key={id} id={id} room={room} />
      ))}
    </Box>
  );
};

export default ListRooms;

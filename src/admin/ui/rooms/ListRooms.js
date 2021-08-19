import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
import { Card, Box, Tooltip } from '@material-ui/core';
import { Videocam } from '@material-ui/icons';
import useStyles from '../shared/useStyles';

const baseUrl = process.env.REACT_APP_ASSETS_BASE;

const RoomImg = ({ img }) => {
  const classes = useStyles();
  const { gameName } = useParams();
  const imgUrl = `${baseUrl}/${gameName}/img/${img}.png`;

  return (
    <Tooltip title={img}>
      <img className={classes.roomImg} src={imgUrl} alt={img} />
    </Tooltip>
  )
}

const RoomVideo = ({ video }) => {
  const classes = useStyles();

  return (
    <Tooltip title={video}>
      <Videocam className={classes.roomVideo} />
    </Tooltip>
  )
}

const RoomCard = ({ room, id }) => {
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

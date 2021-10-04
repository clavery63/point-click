import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from '../shared/useStyles';
import PreviewWidget from '../preview/PreviewWidget';
import { ArrowBack } from '@material-ui/icons';
import RoomDetails from './RoomDetails';
import EntityDetails from './EntityDetails';

const EditRoom = () => {
  const { roomId, gameName } = useParams();
  const styles = useStyles();
  const room = useSelector(state => {
    return state.gameState.worldState.rooms[roomId];
  });

  if (!room) {
    return null;
  }

  return (
    <div className={styles.adminContent}>
      <RoomDetails />
      <EntityDetails />
    </div>
  );
};

export default EditRoom;

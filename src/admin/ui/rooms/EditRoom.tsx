import React from 'react';
import { useParams } from 'react-router-dom';
import useStyles from '../shared/useStyles';
import RoomDetails from './RoomDetails';
import EntityDetails from './EntityDetails';
import { useSelector } from '../hooks/redux';

const EditRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const styles = useStyles();
  const room = useSelector(state => {
    return state.gameState.worldState.rooms[parseInt(roomId)];
  });

  if (!room) {
    return null;
  }

  return (
    <div>
      <RoomDetails />
      <EntityDetails />
    </div>
  );
};

export default EditRoom;

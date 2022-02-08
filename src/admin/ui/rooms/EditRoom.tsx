import React from 'react';
import { useParams } from 'react-router-dom';
import RoomDetails from './RoomDetails';
import EntityDetails from './EntityDetails';
import { useSelector } from '../hooks/redux';

const EditRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const room = useSelector(state => {
    return state.gameState.worldState.rooms[parseInt(roomId, 10)];
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

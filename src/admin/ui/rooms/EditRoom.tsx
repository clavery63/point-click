import React from 'react';
import { useParams } from 'react-router-dom';
import RoomDetails from './RoomDetails';
import { useSelector } from '../hooks/redux';
import EntityPane from './EntityPane';

const EditRoom = () => {
  const { roomId: roomIdString } = useParams<{ roomId: string }>();
  const roomId = parseInt(roomIdString, 10);
  const room = useSelector(state => {
    return state.gameState.present.worldState.rooms[roomId];
  });

  if (!room) {
    return null;
  }

  return (
    <div>
      <RoomDetails room={room} roomId={roomId} />
      <EntityPane room={room} />
    </div>
  );
};

export default EditRoom;

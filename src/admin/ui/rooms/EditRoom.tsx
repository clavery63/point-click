import React from 'react';
import { useParams } from 'react-router-dom';
import RoomDetails from './RoomDetails';
import EntityPane from './EntityPane';

const EditRoom = () => {
  const { roomId: roomIdString } = useParams<{ roomId: string }>();
  const roomId = parseInt(roomIdString, 10);

  return (
    <div>
      <RoomDetails roomId={roomId} />
      <EntityPane />
    </div>
  );
};

export default EditRoom;

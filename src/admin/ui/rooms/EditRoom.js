import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const EditRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const room = useSelector(state => {
    return state.gameState.worldState.rooms[roomId];
  });

  const handleChange = event => {
    // TODO: make this more general
    dispatch({
      type: 'SET_ROOM',
      payload: {
        id: roomId,
        room: {
          ...room,
          description: event.target.value
        }
      }
    });
  };

  if (!room) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4">Edit Room: {roomId}</Typography>
      <TextField
          label="description"
          multiline
          maxRows={4}
          value={room.description}
          onChange={handleChange}
          variant="outlined"
        />
    </Box>
  );
};

export default EditRoom;

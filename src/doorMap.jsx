import React from 'react';

const DOORS_PER_ROW = 5;
const DOOR_SIZE = 100 / DOORS_PER_ROW;

const doorStyle = (x, y) => ({
  left: `${x * DOOR_SIZE}%`,
  top: `${y * DOOR_SIZE}%`
});

const renderDoors = ({ doors, rooms, onDoorClick }) =>
  doors.map(({ dest, mapPosition, dir }) => {
    const { x, y } = mapPosition;
    const text = rooms[dest].text;
    return <div
      onClick={() => onDoorClick(dest, dir, text)}
      style={doorStyle(x, y)}
      className='door-map-door'
    />
  })

const DoorMap = props => {
  return (
    <div className='door-map'>
      {renderDoors(props)}
    </div>
  )
}

export default DoorMap;

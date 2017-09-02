import React from 'react';

const renderItems = ({ items, onItemClick }) =>
  items.map(({ name, style }) => (
    <div onClick={() => onItemClick(name)} style={style}>
      {name}
    </div>
  ))

const renderDoors = ({ doors, rooms, onDoorClick }) =>
  doors.map(({ dest, style }) => {
    const text = rooms[dest].text;
    return <div onClick={() => onDoorClick(dest, text)} style={style}></div>
  })

const ViewPort = (props) => (
  <div className='view-port'>
    <h2>{props.name}</h2>
    {renderItems(props)}
    {renderDoors(props)}
  </div>
)

export default ViewPort;

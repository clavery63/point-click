import React from 'react';
import Transition from './transition.jsx'

const renderItems = ({ items, onItemClick }) =>
  items.map(({ name, style }) => (
    <div onClick={() => onItemClick(name)} className='room-item' style={style}>
    </div>
  ))

const renderDoors = ({ doors, rooms, onDoorClick }) =>
  doors.map(({ dest, style, dir }) => {
    const text = rooms[dest].text;
    return <div onClick={() => onDoorClick(dest, dir, text)} style={style} />
  })

const renderTransition = ({ transition, onTransitionMid, onTransitionEnd }) => {
  const { enabled, ...props } = transition;
  if (enabled === true) {
    return <Transition
      {...props}
      onTransitionMid={onTransitionMid}
      onTransitionEnd={onTransitionEnd}
    />;
  } else {
    return <div></div>;
  }
}

const ViewPort = (props) => (
  <div className='view-port-container'>
    {renderTransition(props)}
    <div className='view-port'>
      <h2>{props.name}</h2>
      {renderItems(props)}
      {renderDoors(props)}
    </div>
  </div>
)

export default ViewPort;

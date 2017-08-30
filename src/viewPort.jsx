import React from 'react';

export default function ViewPort({ items, onItemClick }) {
  return (
    <div className='view-port'>
      <h2>Viewport!</h2>
      {items.map(({ name, style }) => (
        <div
          onClick={() => onItemClick(name)}
          style={style}
        >
          {name}
        </div>
      ))}
    </div>
  )
}

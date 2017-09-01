import React from 'react';

export default function BottomContent({ onMenuButton }) {
  return (
    <div className='bottom-content'>
      <h2>Bottom Content</h2>
      <button onClick={() => onMenuButton('MENU')}>Go to menu!</button>
    </div>
  )
}

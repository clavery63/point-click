import React from 'react';

export default function BottomContent({ onMenuButton }) {
  return (
    <div className='bottom-content'>
      <span className='menu-button' onClick={() => onMenuButton('MENU')}>
        Go to menu!
      </span>
    </div>
  )
}

import React from 'react';
import DoorMap from './doorMap.jsx'

export default function BottomContent(props) {
  const { onMenuButton, ...doorMapProps } = props;
  return (
    <div className='bottom-content'>
      <DoorMap {...doorMapProps} />
      <span className='menu-button' onClick={() => onMenuButton('MENU')}>
        Go to menu!
      </span>
    </div>
  )
}

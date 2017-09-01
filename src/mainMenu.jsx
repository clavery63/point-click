import React from 'react';

export default function MainMenu({ menu, onMenuButton }) {
  if (menu === 'NONE') {
    return <div></div>
  } else {
    return (
      <div className='main-menu'>
        <button onClick={onMenuButton}>Go to game!</button>
        <p>Ah, glad you asked!  This is MainMenu!</p>
      </div>
    )
  }
}

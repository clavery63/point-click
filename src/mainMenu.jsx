import React from 'react';

export default function MainMenu(props) {
  return (
    <div className='main-menu'>
      <button onClick={props.goToGame}>Go to game!</button>
      <p>Ah, glad you asked, {props.name}!  This is MainMenu!</p>
    </div>
  )
}

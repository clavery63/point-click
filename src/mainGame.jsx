import React from 'react';
import ViewPort from './viewPort.jsx';
import ItemListContainer from './itemListContainer.js';
import BottomContent from './bottomContent.jsx';

export default function MainGame(props) {
  return (
    <div className='main-game'>
      <ViewPort />
      <ItemListContainer items={props.items}/>
      <BottomContent goToMenu={props.goToMenu} />
      <p>Why hello, {props.name}!  Welcome to MainGame!</p>
    </div>
  )
}

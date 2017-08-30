import React from 'react';
import ViewPortContainer from './viewPortContainer.js';
import ItemListContainer from './itemListContainer.js';
import BottomContent from './bottomContent.jsx';

export default function MainGame(props) {
  return (
    <div className='main-game'>
      <ViewPortContainer />
      <ItemListContainer />
      <BottomContent goToMenu={props.goToMenu} />
      <p>Why hello, {props.name}!  Welcome to MainGame!</p>
    </div>
  )
}

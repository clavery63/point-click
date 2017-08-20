import React from 'react';
import ViewPort from './viewPort.jsx';
import ItemList from './itemList.jsx';
import BottomContent from './bottomContent.jsx';

export default function MainGame(props) {
  return (
    <div className='main-game'>
      <ViewPort />
      <ItemList items={props.items}/>
      <BottomContent goToMenu={props.goToMenu} />
      <p>Why hello, {props.name}!  Welcome to MainGame!</p>
    </div>
  )
}

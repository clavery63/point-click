import React from 'react';
import ViewPortContainer from './viewPortContainer.js';
import ItemListContainer from './itemListContainer.js';
import BottomContentContainer from './bottomContentContainer.js';

export default function MainGame(props) {
  return (
    <div className='main-game'>
      <ViewPortContainer />
      <ItemListContainer />
      <BottomContentContainer />
    </div>
  )
}

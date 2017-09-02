import React from 'react';
import MainGame from './mainGame.jsx';
import MenuContainer from './menuContainer.js';
import TextAreaContainer from './textAreaContainer.js';

export default function App() {
  return (
    <div>
      <MainGame />
      <MenuContainer />
      <TextAreaContainer />
    </div>
  )
}

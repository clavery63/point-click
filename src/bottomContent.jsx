import React from 'react';

export default function BottomContent(props) {
  return (
    <div className='bottom-content'>
      <h2>Bottom Content</h2>
      <button onClick={props.goToMenu}>Go to menu!</button>
    </div>
  )
}

import React from 'react';
import Item from './item.jsx';

export default function ItemList(props) {
  return (
    <div className='item-list'>
      {props.items.map(item => {
        return <Item name={item} />
      })}
    </div>
  )
}

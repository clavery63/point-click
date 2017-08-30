import React from 'react';
import Item from './item.jsx';

export default function ItemList({ items, onItemClick }) {
  return (
    <ul className='item-list'>
      {items.map(item => (
        <Item onClick={() => onItemClick(item)} name={item} />
      ))}
    </ul>
  )
}

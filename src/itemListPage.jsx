import React from 'react';
import Item from './item.jsx';

export default function ItemListPage({ items, onItemClick }) {
  return (
    <ul className='item-list-page'>
      {items.map(item => (
        <Item onClick={() => onItemClick(item)} name={item} />
      ))}
    </ul>
  )
}

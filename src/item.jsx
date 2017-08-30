import React from 'react';

export default function Item({ name, onClick }) {
  return (
    <li className='item' onClick={onClick}>
      {name}
    </li>
  )
}

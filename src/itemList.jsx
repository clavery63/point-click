import React from 'react';
import ItemListPage from './itemListPage.jsx';
import Prev from './prev.jsx';
import Next from './next.jsx';

const ITEMS_PER_PAGE = 10;

export default function ItemList({ items, ui, onItemClick, onPageClick }) {
  const { page } = ui;
  const prevPage = Math.max(page - 1, 0);
  const maxPage = Math.floor((items.length - 1) / ITEMS_PER_PAGE);
  const nextPage = Math.min(page + 1, maxPage);
  const pageMin = page * ITEMS_PER_PAGE;
  const pageMax = pageMin + ITEMS_PER_PAGE;
  const pageItems = items.slice(pageMin, pageMax);
  return (
    <div className='item-list-container'>
      <ItemListPage items={pageItems} onItemClick={onItemClick} />
      <Prev onClick={() => onPageClick(prevPage)} />
      <Next onClick={() => onPageClick(nextPage)} />
    </div>
  )
}

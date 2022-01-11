import { setValue, keepState } from './utils';
import { DoorDir } from '../types';
import { ParentReducer } from 'shared/util/types';

const ITEMS_PER_PAGE = 7;

const changePageReducer: ParentReducer<DoorDir> = (direction, playerState) => {
  const { items, page, examining } = playerState;
  const lastPage = Math.floor((items.length - 1) / ITEMS_PER_PAGE);

  if (!!examining) {
    return setValue('playerState.examining')(null);
  }
  
  switch (direction) {
    case 'DOWN':
      const newPage = Math.min(page + 1, lastPage);
      return setValue('playerState.page')(newPage);
    case 'UP':
      return setValue('playerState.page')(Math.max(page - 1, 0));
    default:
      return keepState();
  }
};

export default changePageReducer;

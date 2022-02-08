import { createAction } from '@reduxjs/toolkit';
import { GameStoreState } from 'game/store/types';

// eslint-disable-next-line import/prefer-default-export
export const setGameState = createAction<GameStoreState>('setGameState');

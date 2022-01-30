import { createAction } from '@reduxjs/toolkit'
import { GameStoreState } from 'game/store/types'

export const setGameState = createAction<GameStoreState>('setGameState');

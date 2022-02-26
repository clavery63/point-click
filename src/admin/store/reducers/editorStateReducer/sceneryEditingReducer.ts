import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Position = 'startPosition' | 'endPosition';

type PositionWithId = {
  position: Position;
  id: number;
};

export const sceneryEditingSlice = createSlice({
  name: 'sceneryEditing',
  initialState: [] as Position[],
  reducers: {
    setSceneryEditing: (state, action: PayloadAction<PositionWithId>) => {
      const { id, position } = action.payload;
      state[id] = position;
    },
  },
});

export const { setSceneryEditing } = sceneryEditingSlice.actions;

export default sceneryEditingSlice.reducer;

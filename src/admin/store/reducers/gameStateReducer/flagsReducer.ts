import { createSlice } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

export const flagsSlice = createSlice({
  name: 'flags',
  // TODO: This should be a Set, but again, redux-toolkit sucks (why am I using it again?)
  // Go ahead. Try making a Set and see what happens. And then try fixing that. Ugh.
  //
  // Reading more on this, we might be able to just use a standard reducer here.
  // Fingers crossed.
  //
  // But also, we're doing a lot of work to make flags a Set, with no benefit
  // unless someone is making thousand of them, probably. So we probably should
  // just make flags an array anyway.
  initialState: [] as string[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => [...action.payload.flags]);
  },
});

export default flagsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { VerbName } from 'game/store/types';

type VerbPayload = {
  verb: VerbName;
  index: number;
};

export const verbNamesSlice = createSlice({
  name: 'verbNames',
  initialState: [] as VerbName[],
  reducers: {
    setVerb: (state, action: PayloadAction<VerbPayload>) => {
      const { verb, index } = action.payload;

      state[index] = verb;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.verbNames);
  },
});

export const { setVerb } = verbNamesSlice.actions;

export default verbNamesSlice.reducer;

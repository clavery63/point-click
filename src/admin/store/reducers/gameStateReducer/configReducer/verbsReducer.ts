import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';
import { VerbConfig } from 'game/store/types';

type VerbPayload = {
  verb: VerbConfig;
  index: number;
};

export const verbsSlice = createSlice({
  name: 'verbs',
  initialState: [] as VerbConfig[],
  reducers: {
    setVerb: (state, action: PayloadAction<VerbPayload>) => {
      const { verb, index } = action.payload;

      state[index] = verb;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => action.payload.config.verbs);
  },
});

export const { setVerb } = verbsSlice.actions;

export default verbsSlice.reducer;

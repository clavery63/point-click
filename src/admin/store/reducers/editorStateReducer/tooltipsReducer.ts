import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const storageKey = 'point-click-tooltips';

export const setTooltipEnabled = createAsyncThunk(
  'tooltips/enabled',
  async (enabled: boolean) => {
    const value = enabled ? '1' : '0';
    localStorage.setItem(storageKey, value);
    return enabled;
  },
);

export const tooltipsSlice = createSlice({
  name: 'tooltips',
  initialState: () => {
    const stringValue = localStorage.getItem(storageKey);
    if (!stringValue) {
      return true;
    }
    return stringValue === '1';
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setTooltipEnabled.fulfilled, (state, action) => action.payload);
  },
});

export default tooltipsSlice.reducer;

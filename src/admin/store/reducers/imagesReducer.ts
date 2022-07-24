import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

const initialState: Record<string, HTMLImageElement> = {};

type ImgPayload = {
  name: string;
  img: HTMLImageElement;
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImgPayload>) => {
      const { name, img } = action.payload;

      // @ts-ignore ...long story
      state[name] = img;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => Object.fromEntries(action.payload.images));
  },
});

export const { addImage } = imagesSlice.actions;

export default imagesSlice.reducer;

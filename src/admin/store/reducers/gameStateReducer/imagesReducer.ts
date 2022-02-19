import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from 'admin/store/sharedActions';

const initialState: Record<string, HTMLImageElement> = {};

type ImgPayload = {
  file: File;
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImgPayload>) => {
      const { file } = action.payload;

      const slug = file.name.split('.')[0];
      const dataUrl = window.URL.createObjectURL(file);
      const img = new Image();
      img.src = dataUrl;

      // @ts-ignore ...long story
      state[slug] = img;
    },
  },
  extraReducers: builder => {
    builder.addCase(setGameState, (state, action) => Object.fromEntries(action.payload.images));
  },
});

export const { addImage } = imagesSlice.actions;

export default imagesSlice.reducer;

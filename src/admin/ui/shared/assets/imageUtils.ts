import { Nullable } from 'game/store/types';

const DEFAULT_MAX_SIZE = 256;

type GetImageDimensions = (f: File) => Promise<{ width: number; height: number}>;
const getImageDimensions: GetImageDimensions = file => new Promise((resolve, reject) => {
  const dataUrl = window.URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    resolve({
      height: img.height,
      width: img.width,
    });
  };
  img.onerror = () => {
    reject(new Error('Damn. Something was wrong with that image I guess.'));
  };
  img.src = dataUrl;
});

export const validateImage = async (
  width: number,
  height: number,
  maxWidth: number = DEFAULT_MAX_SIZE,
  maxHeight: number = DEFAULT_MAX_SIZE,
  exactSize: boolean = false,
): Promise<Nullable<string>> => {
  if (exactSize && (width !== maxWidth || height !== maxHeight)) {
    return `The image must be exactly ${maxWidth} x ${maxHeight}.
        Apparently the one you selected is ${width} x ${height}? I don't know.`;
  }
  if (!exactSize && (width > maxWidth || height > maxHeight)) {
    return `Dammit, the image is too big(${width} x ${height}).
        The max size is ${maxWidth} x ${maxHeight}`;
  }
  if (width === 0 || height === 0) {
    return 'Unable to get dimensions of this image. Is it the right format?';
  }

  return null;
};

export const validateImageFile = async (
  file: File,
  maxWidth: number = DEFAULT_MAX_SIZE,
  maxHeight: number = DEFAULT_MAX_SIZE,
  exactSize: boolean = false,
): Promise<Nullable<string>> => {
  try {
    const { width, height } = await getImageDimensions(file);
    return validateImage(width, height, maxWidth, maxHeight, exactSize);
  } catch (e: any) {
    return e.message;
  }
};

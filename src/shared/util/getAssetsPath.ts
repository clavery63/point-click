const getAssetsPath = (type: string) => (gameName: string) => {
  return `${process.env.REACT_APP_ASSETS_BASE}/${gameName}/${type}`;
};

export const getAudioPath = getAssetsPath('audio');
export const getVideoPath = getAssetsPath('video');

const baseUrl = process.env.REACT_APP_ASSETS_BASE;

const assetsPathSelector = state => {
  const gameName = state.gameName;
  const root = `${baseUrl}/${gameName}`;

  return {
    getImage: key => `${root}/img/${key}.png`
  }
};

export default assetsPathSelector;

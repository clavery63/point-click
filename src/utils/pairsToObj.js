const pairsToObj = pairs => {
  return pairs.reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {});
};

export default pairsToObj;

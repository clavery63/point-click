const includesAll = (bigger: string[], smaller: string[] = []) => {
  return !smaller.some(item => !bigger.includes(item));
};

export default includesAll;

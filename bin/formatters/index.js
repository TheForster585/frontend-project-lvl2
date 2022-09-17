import stylish from './stylish.js';

const format = (filepath1, filepath2, option = 'stylish') => {
  if (option === 'stylish') return stylish(filepath1, filepath2);
  return stylish(filepath1, filepath2);
};

export default format;

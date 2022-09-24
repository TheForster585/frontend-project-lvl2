//import { isPlainObject } from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const format = (filepath1, filepath2, option = 'stylish') => {
  if (option === 'stylish') return stylish(filepath1, filepath2);
  if (option === 'plain') return plain(filepath1, filepath2);
  return stylish(filepath1, filepath2);
};

export default format;

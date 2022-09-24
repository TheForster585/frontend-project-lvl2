import _ from 'lodash';
import getObject from '../parsers.js';
import diff from '../diff.js';

const json = (filepath1, filepath2) => {
  const fileObject1 = getObject(filepath1);
  const fileObject2 = getObject(filepath2);
  const difference = diff(fileObject1, fileObject2);
  return JSON.stringify(difference);
};

export default json;

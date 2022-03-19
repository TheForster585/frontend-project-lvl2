import _ from 'lodash';
import { readFileSync } from 'fs';

const readFile = (path) => readFileSync(path, 'utf8');

const jsonDiff = (filepath1, filepath2) => {
  const getObjectFromFile = (path) => {
    const fileString = readFile(path);
    const fileObj = JSON.parse(fileString);
    return fileObj;
  };

  const fileObject1 = getObjectFromFile(filepath1);
  const fileObject2 = getObjectFromFile(filepath2);

  const allKeys = _.sortBy(
    _.uniq(
      [...Object.keys(fileObject1), ...Object.keys(fileObject2)],
    ),
  );

  const difference = allKeys.reduce((acc, key) => {
    if (fileObject1[key] === fileObject2[key]) {
      acc.push(`    ${key}: ${fileObject1[key]}`);
      return acc;
    }
    if (fileObject1[key] !== undefined && fileObject2[key] === undefined) {
      acc.push(`  - ${key}: ${fileObject1[key]}`);
      return acc;
    }
    if (fileObject1[key] === undefined && fileObject2[key] !== undefined) {
      acc.push(`  + ${key}: ${fileObject2[key]}`);
      return acc;
    }
    if (fileObject1[key] !== fileObject2[key]) {
      acc.push(`  - ${key}: ${fileObject1[key]}`);
      acc.push(`  + ${key}: ${fileObject2[key]}`);
      return acc;
    }
    return acc;
  }, []);

  const result = `{\n${difference.join('\n')}\n}`;
  console.log(result);
  return result;
};

export default jsonDiff;

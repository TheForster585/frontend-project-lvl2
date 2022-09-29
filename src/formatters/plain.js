import _ from 'lodash';
import getObject from '../parsers.js';
import diff from '../diff.js';

const plain = (filepath1, filepath2) => {
  const fileObject1 = getObject(filepath1);
  const fileObject2 = getObject(filepath2);
  const difference = diff(fileObject1, fileObject2);
  const stringify = (value) => {
    const displayValue = (value) => {
      if (_.isObject(value)) return '[complex value]';
      if (_.isString(value)) return `'${value}'`;
      return `${value}`;
    };
    const iter = (currentValue, currentPath) => {
      const newPath = (oldPath, value) => {
        if (value.key === undefined) return '';
        if (oldPath === '') return `${value.key}`;
        return `${oldPath}.${value.key}`;
      };
      console.log(currentValue);
      if ((_.has(currentValue, 'children')) && (currentValue.status !== 'added') && (currentValue.status !== 'deleted') && (currentValue.status !== 'changed')) {  
        const {children} = currentValue;
        return children.flatMap((child) => iter(child, newPath(currentPath, currentValue))).filter((item) => item !== 'filter').join('\n');
      }
      if (currentValue.status === 'changed') {
        return `Property '${newPath(currentPath, currentValue)}' was updated. From ${displayValue(currentValue.deletedValue)} to ${displayValue(currentValue.addedValue)}`;
      }
      if (currentValue.status === 'added') {
        return `Property '${newPath(currentPath, currentValue)}' was added with value: ${displayValue(currentValue.value)}`;
      }
      if (currentValue.status === 'deleted') {
        return `Property '${newPath(currentPath, currentValue)}' was removed`;
      }
      return 'filter';
    };
    return iter(value, '');
  };
  return stringify(difference);
};

export default plain;

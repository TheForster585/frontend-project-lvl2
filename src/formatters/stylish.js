import _ from 'lodash';
import getObject from '../parsers.js';
import diff from '../diff.js';

const stylish = (filepath1, filepath2) => {
  const fileObject1 = getObject(filepath1);
  const fileObject2 = getObject(filepath2);
  const difference = diff(fileObject1, fileObject2);
  const stringify = (value) => {
    const iter = (currentValue, depth) => {
      const indentSize = depth * 2;
      const replacer = ' ';
      const newDepth = depth + 2;
      const getChildren = (keyName) => currentValue[keyName].reduce((acc, child) => {
        acc.push(iter(child, newDepth));
        return acc;
      }, []);
      if (currentValue.status === 'added' || currentValue.status === 'deleted' || currentValue.status === 'same' || currentValue.status === 'changed') {
        const currentIndent = replacer.repeat(indentSize - 2);

        if (currentValue.status === 'same') {
          return `${currentIndent}  ${currentValue.key}: ${currentValue.value}`;
        }

        if (currentValue.status === 'changed') {
          if (_.has(currentValue, 'children')) {
            if (_.isObject(currentValue, 'deletedValue')) {
              const children = getChildren('children');
              return `${currentIndent}- ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }\n${currentIndent}+ ${currentValue.key}: ${currentValue.addedValue}`;
            }
            if (_.isObject(currentValue, 'addedValue')) {
              const children = getChildren('children');
              return `${currentIndent}- ${currentValue.key}: ${currentValue.deletedValue}\n${currentIndent}- ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }`;
            }
          }
          return `${currentIndent}- ${currentValue.key}: ${currentValue.deletedValue}\n${currentIndent}+ ${currentValue.key}: ${currentValue.addedValue}`;
        }

        if (currentValue.status === 'deleted') {
          if (_.has(currentValue, 'children')) {
            const children = getChildren('children');
            return `${currentIndent}- ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }`;
          }
          return `${currentIndent}- ${currentValue.key}: ${currentValue.value}`;
        }

        if (currentValue.status === 'added') {
          if (_.has(currentValue, 'children')) {
            const children = getChildren('children');
            return `${currentIndent}+ ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }`;
          }
          return `${currentIndent}+ ${currentValue.key}: ${currentValue.value}`;
        }

        return `\n${currentIndent}${iter(currentValue.addedValue, 2)}`;
      }
      const children = getChildren('children');
      const currentIndent = replacer.repeat(indentSize);
      const displayKey = (object) => (object === difference ? '' : `${currentIndent}${currentValue.key}: `);
      return `${displayKey(currentValue)}{\n${children.join('\n')}\n${currentIndent}}`;
    };
    return iter(value, 0);
  };
  return stringify(difference);
};

export default stylish;

import _ from 'lodash';
import getObject from './parsers.js';

const diff = (entry1, entry2) => {
  const iter = (acc, value1, value2, key) => {
    const stringify = (value, replacer = ' ', spacesCount = 1) => {
      const iter = (currentValue, depth) => {
        if (!_.isObject(currentValue)) {
          return `${currentValue}`;
        }

        const indentSize = depth * spacesCount;
        const currentIndent = replacer.repeat(indentSize);
        const bracketIndent = replacer.repeat(indentSize - spacesCount);
        const lines = Object
          .entries(currentValue)
          .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

        return [
          '{',
          ...lines,
          `${bracketIndent}}`,
        ].join('\n');
      };

      return iter(value, 1);
    };

    if (_.isObject(value1) && _.isObject(value2)) {
      const allKeys = _.sortBy(
        _.uniq(
          [...Object.keys(value1), ...Object.keys(value2)],
        ),
      );

      const difference = allKeys.reduce((acc, key) => {
        const newValue1 = value1[key];
        const newValue2 = value2[key];
        acc = [...acc, iter([], newValue1, newValue2, key)];
        return acc;
      }, []);
      const displayKey = key === undefined ? '' : `${key}: `;
      const result = `${displayKey}{\n${difference.flat().join('\n')}\n}`;
      return result;
    }

    if (value1 === value2) {
      acc.push(`    ${key}: ${stringify(value1)}`);
      return acc;
    }
    if (value1 !== undefined && value2 === undefined) {
      acc.push(`  - ${key}: ${stringify(value1)}`);
      return acc;
    }
    if (value1 === undefined && value2 !== undefined) {
      acc.push(`  + ${key}: ${stringify(value2)}`);
      return acc;
    }
    if (value1 !== value2) {
      acc.push(`  - ${key}: ${stringify(value1)}`);
      acc.push(`  + ${key}: ${stringify(value2)}`);
      return acc;
    }
  };
  console.log(iter([], entry1, entry2));
  return iter([], entry1, entry2);
};

const jsonDiff = (filepath1, filepath2) => {
  const fileObject1 = getObject(filepath1);
  const fileObject2 = getObject(filepath2);
  return diff(fileObject1, fileObject2);
};

export default jsonDiff;

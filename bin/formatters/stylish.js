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
      if ((_.has(currentValue, 'added')) || (_.has(currentValue, 'deleted')) || (_.has(currentValue, 'same'))) {
        const currentIndent = replacer.repeat(indentSize - 2);

        if (_.has(currentValue, 'same')) {
          return `${currentIndent}  ${currentValue.key}: ${currentValue.same}`;
        }

        if ((_.has(currentValue, 'deleted')) && (_.has(currentValue, 'added'))) {
          if (_.has(currentValue, 'deletedChildren')) {
            const children = currentValue.deletedChildren.reduce((acc, child) => {
              acc.push(iter(child, newDepth));
              return acc;
            }, []);
            const currentIndent = replacer.repeat(indentSize - 2);
            return `${currentIndent}- ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }\n${currentIndent}+ ${currentValue.key}: ${currentValue.added}`;
          }
          if (_.has(currentValue, 'addedChildren')) {
            const children = currentValue.addedChildren.reduce((acc, child) => {
              acc.push(iter(child, newDepth));
              return acc;
            }, []);
            const currentIndent = replacer.repeat(indentSize - 2);
            return `${currentIndent}- ${currentValue.key}: ${currentValue.deleted}\n${currentIndent}- ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }`;
          }
          return `${currentIndent}- ${currentValue.key}: ${currentValue.deleted}\n${currentIndent}+ ${currentValue.key}: ${currentValue.added}`;
        }

        if (_.has(currentValue, 'deleted')) {
          if (_.has(currentValue, 'children')) {
            const children = currentValue.children.reduce((acc, child) => {
              acc.push(iter(child, newDepth));
              return acc;
            }, []);
            const currentIndent = replacer.repeat(indentSize - 2);
            return `${currentIndent}- ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }`;
          }
          return `${currentIndent}- ${currentValue.key}: ${currentValue.deleted}`;
        }

        if (_.has(currentValue, 'added')) {
          if (_.has(currentValue, 'children')) {
            const children = currentValue.children.reduce((acc, child) => {
              acc.push(iter(child, newDepth));
              return acc;
            }, []);
            const currentIndent = replacer.repeat(indentSize - 2);
            return `${currentIndent}+ ${currentValue.key}: {\n${children.join('\n')}\n${currentIndent}  }`;
          }
          return `${currentIndent}+ ${currentValue.key}: ${currentValue.added}`;
        }

        return `\n${currentIndent}${iter(currentValue.added, 2)}`;
      }
      const children = currentValue.children.reduce((acc, child) => {
        acc.push(iter(child, newDepth));
        return acc;
      }, []);
      const currentIndent = replacer.repeat(indentSize);
      const displayKey = (object) => (object === difference ? '' : `${currentIndent}${currentValue.key}: `);
      return `${displayKey(currentValue)}{\n${children.join('\n')}\n${currentIndent}}`;
    };
    return iter(value, 0);
  };
  return stringify(difference);
};

export default stylish;

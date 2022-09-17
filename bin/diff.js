import _ from 'lodash';
import getObject from './parsers.js';

const diff = (entry1, entry2) => {
  const compare = (value1, value2, key) => {
    if (_.isObject(value1) && _.isObject(value2)) {
      const allKeys = _.sortBy(
        _.uniq(
          [...Object.keys(value1), ...Object.keys(value2)],
        ),
      );

      const difference = allKeys.reduce((acc, key) => {
        const newValue1 = value1[key];
        const newValue2 = value2[key];
        acc = [...acc, compare(newValue1, newValue2, key)];
        return acc;
      }, []);
      return {
        key,
        children: difference,
      };
    }

    const result = {};

    if (value1 === value2) {
      result.key = key;
      result.same = value1;
      return result;
    }
    if (value1 !== undefined && value2 === undefined) {
      result.key = key;
      result.deleted = value1;
      if (_.isObject(value1)) {
        const keys = Object.keys(value1);
        const noDiff = keys.reduce((acc, key) => {
          return [...acc, compare(value1[key], value1[key], key)];
        }, []);
        result.children = noDiff;
      }
      return result;
    }
    if (value1 === undefined && value2 !== undefined) {
      result.key = key;
      result.added = value2;
      if (_.isObject(value2)) {
        const keys = Object.keys(value2);
        const noDiff = keys.reduce((acc, key) => {
          return [...acc, compare(value2[key], value2[key], key)];
        }, []);
        result.children = noDiff;
      }
      return result;
    }
    if (value1 !== value2) {
      result.key = key;
      result.deleted = value1;
      if (_.isObject(value1)) {
        const keys = Object.keys(value1);
        const noDiff = keys.reduce((acc, key) => {
          return [...acc, compare(value1[key], value1[key], key)];
        }, []);
        result.deletedChildren = noDiff;
      }
      result.added = value2;
      if (_.isObject(value2)) {
        const keys = Object.keys(value2);
        const noDiff = keys.reduce((acc, key) => {
          return [...acc, compare(value2[key], value2[key], key)];
        }, []);
        result.addedChildren = noDiff;
      }
      return result;
    }
  };
  return compare(entry1, entry2);
};

export default diff;

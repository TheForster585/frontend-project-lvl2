import _ from 'lodash';

const diff = (entry1, entry2) => {
  const compare = (value1, value2, key) => {
    const noDiff = (value) => {
      const keys = Object.keys(value);
      return keys.reduce((acc, ndKey) => [...acc, compare(value[ndKey], value[ndKey], ndKey)], []);
    };

    if (_.isObject(value1) && _.isObject(value2)) {
      const allKeys = _.sortBy(
        _.uniq(
          [...Object.keys(value1), ...Object.keys(value2)],
        ),
      );

      const difference = allKeys.reduce((acc, dKey) => {
        const newValue1 = value1[dKey];
        const newValue2 = value2[dKey];
        return [...acc, compare(newValue1, newValue2, dKey)];
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
        result.children = noDiff(value1);
      }
      return result;
    }
    if (value1 === undefined && value2 !== undefined) {
      result.key = key;
      result.added = value2;
      if (_.isObject(value2)) {
        result.children = noDiff(value2);
      }
      return result;
    }
    if (value1 !== value2) {
      result.key = key;
      result.deleted = value1;
      if (_.isObject(value1)) {
        result.deletedChildren = noDiff(value1);
      }
      result.added = value2;
      if (_.isObject(value2)) {
        result.addedChildren = noDiff(value2);
      }
      return result;
    }
    return result;
  };
  return compare(entry1, entry2);
};

export default diff;

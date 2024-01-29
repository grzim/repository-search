export const isObject = <T>(value: T): value is T & Record<string, unknown> => {
  return value instanceof Object && typeof value === 'object';
};
export const areObjectsEqual = <T extends Record<string, unknown>>({
  obj1,
  obj2,
}: {
  obj1: T;
  obj2: T;
}): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return false;
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    const bothAreObjects = isObject(val1) && isObject(val2);
    return bothAreObjects
      ? areObjectsEqual({ obj1: val1, obj2: val2 })
      : val1 === val2;
  });
};

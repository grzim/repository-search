import { createDeepCopy, getOnPath, updateInPath } from '../transform-fns';

describe('getOnPath', () => {
  const testObject = {
    level1: {
      level2: {
        value: 'found',
        array: [1, 2, { deep: 'deepValue' }],
      },
      level2Array: [{ key: 'value1' }, { key: 'value2' }],
    },
  };

  it('returns the value for a valid nested path', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2', 'value'],
    });
    expect(result).toBe('found');
  });

  it('returns undefined for an invalid path', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'invalid', 'value'],
    });
    expect(result).toBeUndefined();
  });

  it('returns undefined if the path leads beyond existing properties', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2', 'nonexistent', 'value'],
    });
    expect(result).toBeUndefined();
  });

  it('handles paths that reference array indices', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2', 'array', 2, 'deep'],
    });
    expect(result).toBe('deepValue');
  });

  it('returns undefined for paths that reference invalid array indices', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2', 'array', 99],
    });
    expect(result).toBeUndefined();
  });

  it('returns an object for a path that ends on an object', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2'],
    });
    expect(result).toEqual({
      value: 'found',
      array: [1, 2, { deep: 'deepValue' }],
    });
  });

  it('returns an array element for a valid array path', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2Array', 1],
    });
    expect(result).toEqual({ key: 'value2' });
  });

  it('returns undefined for a path that ends on a non-object/non-array', () => {
    const result = getOnPath({
      obj: testObject,
      path: ['level1', 'level2', 'value', 'invalid'],
    });
    expect(result).toBeUndefined();
  });
});

describe('updateInPath', () => {
  const testObject = {
    level1: {
      level2: {
        value: 'initial',
        array: [1, 2, 3],
      },
    },
  };

  it('updates the value for a valid nested path', () => {
    const updatedObject = updateInPath({
      obj: testObject,
      path: ['level1', 'level2', 'value'],
      value: 'updated',
    });
    expect(updatedObject.level1.level2.value).toEqual('updated');
  });

  it('does not modify the original object', () => {
    const originalCopy = createDeepCopy(testObject);
    updateInPath({
      obj: testObject,
      path: ['level1', 'level2', 'value'],
      value: 'updated',
    });
    expect(testObject).toEqual(originalCopy);
  });

  it('maintains immutability of the original object', () => {
    const originalCopy = createDeepCopy(testObject);
    updateInPath({
      obj: testObject,
      path: ['level1', 'level2', 'value'],
      value: 'updated',
    });
    expect(testObject).toEqual(originalCopy);
  });

  it('adds new properties for valid paths that did not previously exist', () => {
    const originalCopy = createDeepCopy(testObject);
    const updatedObject = updateInPath({
      obj: testObject,
      path: ['level1', 'level3', 'newProp'],
      value: 'newValue',
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(updatedObject.level1.level3.newProp).toEqual('newValue');
    expect(testObject).toEqual(originalCopy);
  });

  it('handles updates within arrays by specifying array indices in the path', () => {
    const originalCopy = createDeepCopy(testObject);
    const updatedObject = updateInPath({
      obj: testObject,
      path: ['level1', 'level2', 'array', 1],
      value: 4,
    });
    expect(updatedObject.level1.level2.array).toEqual([1, 4, 3]);
    expect(testObject).toEqual(originalCopy);
  });
});

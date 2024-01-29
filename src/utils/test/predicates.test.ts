import { areObjectsEqual } from '../predicates';

describe('areObjectsEqual', () => {
  it('returns true for identical primitive values within objects', () => {
    expect(
      areObjectsEqual({ obj1: { value: 5 }, obj2: { value: 5 } }),
    ).toBeTruthy();
  });

  it('returns false for different primitive values within objects', () => {
    expect(
      areObjectsEqual({ obj1: { value: 5 }, obj2: { value: 10 } }),
    ).toBeFalsy();
  });

  it('returns true for identical objects', () => {
    const obj = { a: 1, b: 'test' };
    expect(areObjectsEqual({ obj1: obj, obj2: obj })).toBeTruthy();
  });

  it('returns false for objects with different shapes', () => {
    const obj1 = { a: 1, b: 'test' };
    const obj2 = { a: 1 };
    expect(areObjectsEqual({ obj1, obj2 })).toBeFalsy();
  });

  it('returns true for deeply nested identical objects', () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };
    expect(areObjectsEqual({ obj1, obj2 })).toBeTruthy();
  });

  it('returns false for deeply nested objects with differences', () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(areObjectsEqual({ obj1, obj2 })).toBeFalsy();
  });

  it('returns true for identical arrays within objects', () => {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 3] };
    expect(areObjectsEqual({ obj1, obj2 })).toBeTruthy();
  });

  it('returns false for arrays with different lengths within objects', () => {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2] };
    expect(areObjectsEqual({ obj1, obj2 })).toBeFalsy();
  });

  it('returns false for arrays with different elements within objects', () => {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 4] };
    expect(areObjectsEqual({ obj1, obj2 })).toBeFalsy();
  });

  it('returns true for empty objects', () => {
    expect(areObjectsEqual({ obj1: {}, obj2: {} })).toBeTruthy();
  });
});

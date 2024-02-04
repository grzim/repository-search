export const createRange = (size: number) =>
  Array.from({ length: size }, (_, i) => i + 1);

export const createDeepCopy = (obj: object) => {
  // Fallback to JSON methods if structuredClone is not available
  return typeof structuredClone === `function`
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));
};

export type DefaultToWhenEmptyParams<T> = {
  defaultValue: T[];
  arr: T[];
};
export const defaultToWhenEmpty = <T>({
  defaultValue,
  arr,
}: DefaultToWhenEmptyParams<T>): T[] => (arr.length > 0 ? arr : defaultValue);

export const getOnPath = <T, U = unknown>({
  obj,
  path,
}: {
  obj: T;
  path: Array<PropertyKey>;
}): U =>
  path.reduce<unknown>((acc, key) => {
    const hasProp =
      acc && typeof acc === `object` && ((key in acc) as unknown as object);
    return hasProp ? (acc as Record<PropertyKey, unknown>)[key] : undefined;
  }, obj) as U;

export const setOnPath = <
  T extends Record<string, unknown>,
  P extends PropertyKey[],
>({
  obj,
  path,
  value,
}: {
  obj: T;
  path: P;
  value: unknown;
}): T => {
  const newObj = createDeepCopy(obj);

  return path.reduce((acc, key, index) => {
    if (index === path.length - 1) {
      acc[key as keyof typeof acc] = value;
      return newObj;
    }
    acc[key as keyof typeof acc] = acc[key as keyof typeof acc] || {};
    return acc[key as keyof typeof acc];
  }, newObj) as T;
};

export type RemoveEmpty = <T extends Record<string, unknown>>(
  obj: T,
) => {
  [prop in keyof T]: T[prop] extends undefined ? never : T[prop];
};

export const removeEmpty = ((obj) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value !== undefined ? { ...acc, [key]: value } : acc,
    {},
  ) as Record<string, unknown>;
}) as RemoveEmpty;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ToVoid = <T = any>(...x: T[]) => void;

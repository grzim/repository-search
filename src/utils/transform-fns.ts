export const createRange = (size: number) =>
  Array.from({ length: size }, (_, i) => i + 1);

export type DefaultToWhenEmptyParams<T> = {
  defaultValue: T[];
  arr: T[];
};

export const defaultToWhenEmpty = <T>({
  defaultValue,
  arr,
}: DefaultToWhenEmptyParams<T>): T[] => (arr.length > 0 ? arr : defaultValue);

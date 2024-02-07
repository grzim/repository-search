import { ReactNode } from 'react';

export type CamelToSnakeCase<S extends string> =
  S extends `${infer P1}${infer P2}`
    ? `${P1 extends Capitalize<P1> ? `_` : ``}${Lowercase<P1>}${CamelToSnakeCase<P2>}`
    : S;

export type NumberToObject<N extends number> = { totalCount: N };

export type ConvertFieldsToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object
    ? ConvertFieldsToSnakeCase<T[K]>
    : T[K];
};

export type ConvertNumberFieldsToObj<T> = {
  [P in keyof T]: T[P] extends Record<string, unknown>
    ? ConvertNumberFieldsToObj<T[P]>
    : T[P] extends number
      ? NumberToObject<T[P]>
      : T[P];
};

export type Edge<T> = {
  node: T;
};

export type StringToReactNode<T, Props> = {
  [P in keyof T]: T[P] extends Record<string, unknown>
    ? StringToReactNode<T[P], Props>
    : T[P] extends Props
      ? ReactNode
      : T[P];
};

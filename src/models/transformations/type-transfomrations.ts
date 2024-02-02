export type GitHubResponseTransformation<DataType> = (
  data: GitHubResponseWrapper<DataType>,
) => DataType;

export type CamelToSnakeCase<S extends string> =
  S extends `${infer P1}${infer P2}`
    ? `${P1 extends Capitalize<P1> ? '_' : ''}${Lowercase<P1>}${CamelToSnakeCase<P2>}`
    : S;

export type NumberToObject<N extends number> = { totalCount: N };

export type ConvertFieldsToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object
    ? ConvertFieldsToSnakeCase<T[K]>
    : T[K];
};

export type ConvertNumberFieldsToObj<T> = {
  [P in keyof T]: T[P] extends object
    ? ConvertNumberFieldsToObj<T[P]>
    : T[P] extends number
      ? NumberToObject<T[P]>
      : T[P];
};

type Edge<T> = {
  node: T;
};

export type GitHubResponseWrapper<T> = Edge<
  ConvertNumberFieldsToObj<ConvertFieldsToSnakeCase<T>>
>;

export type APIModelToUIModelTransform<UIModel> = (
  items: GitHubResponseWrapper<UIModel>[],
) => UIModel[];
